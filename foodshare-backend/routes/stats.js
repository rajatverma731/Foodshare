const router = require('express').Router();
const FoodListing = require('../models/FoodListing');
const DonationRequest = require('../models/DonationRequest');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/platform', async (req, res) => {
  try {
    const [totalListings, totalDonors, totalClaimed, totalUsers] = await Promise.all([
      FoodListing.countDocuments(),
      FoodListing.distinct('donor').then(d => d.length),
      FoodListing.countDocuments({ status: 'claimed' }),
      User.countDocuments()
    ]);
    res.json({ totalListings, totalDonors, totalClaimed, totalUsers });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.get('/user', auth, async (req, res) => {
  try {
    const [myListings, totalDonated, pendingRequests, completed] = await Promise.all([
      FoodListing.countDocuments({ donor: req.user.id }),
      FoodListing.countDocuments({ donor: req.user.id, status: 'claimed' }),
      DonationRequest.countDocuments({ donor: req.user.id, status: 'pending' }),
      DonationRequest.countDocuments({ donor: req.user.id, status: 'approved' })
    ]);
    res.json({ myListings, totalDonated, pendingRequests, completed });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
