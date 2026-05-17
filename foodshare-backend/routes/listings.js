const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const FoodListing = require('../models/FoodListing');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { category, status, search } = req.query;
    const filter = {};
    if (category && category !== 'all') filter.category = category;
    if (status && status !== 'all') filter.status = status;
    if (search) filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ];
    const listings = await FoodListing.find(filter).sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.get('/my', auth, async (req, res) => {
  try {
    const listings = await FoodListing.find({ donor: req.user._id }).sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.get('/:id', async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.post('/', auth, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('quantity').notEmpty().withMessage('Quantity is required'),
  body('expiryDate').isISO8601().withMessage('Valid expiry date is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { title, description, category, quantity, expiryDate, location, image } = req.body;
    const listing = await FoodListing.create({
      title, description, category, quantity, expiryDate, location,
      image: image || '',
      donor: req.user._id,
      donorName: req.user.name,
      status: 'available',
    });
    res.status(201).json(listing);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (listing.donor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    const allowed = ['title', 'description', 'category', 'quantity', 'expiryDate', 'location', 'image', 'status'];
    allowed.forEach(field => { if (req.body[field] !== undefined) listing[field] = req.body[field]; });
    await listing.save();
    res.json(listing);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (listing.donor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    await listing.deleteOne();
    res.json({ message: 'Listing deleted successfully' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;