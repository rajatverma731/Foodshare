const router = require('express').Router();
const DonationRequest = require('../models/DonationRequest');
const FoodListing = require('../models/FoodListing');
const auth = require('../middleware/auth');

// POST create request
router.post('/', auth, async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.body.listingId);
    if (!listing || listing.status !== 'available')
      return res.status(400).json({ message: 'Listing not available' });
    const request = await DonationRequest.create({
      listing: listing._id, listingTitle: listing.title,
      requester: req.user.id, requesterName: req.user.name,
      donor: listing.donor, donorName: listing.donorName,
      message: req.body.message
    });
    res.status(201).json(request);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// GET requests for my listings (donor view)
router.get('/incoming', auth, async (req, res) => {
  try {
    const requests = await DonationRequest.find({ donor: req.user.id })
      .populate('requester', 'name email').sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// GET my sent requests (requester view)
router.get('/sent', auth, async (req, res) => {
  try {
    const requests = await DonationRequest.find({ requester: req.user.id })
      .populate('listing').sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// PUT approve/reject request (donor only)
router.put('/:id', auth, async (req, res) => {
  try {
    const request = await DonationRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.donor.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });
    request.status = req.body.status;
    await request.save();
    if (req.body.status === 'approved') {
      await FoodListing.findByIdAndUpdate(request.listing, { status: 'claimed' });
    }
    res.json(request);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
