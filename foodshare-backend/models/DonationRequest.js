const mongoose = require('mongoose');

const donationRequestSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodListing', required: true },
  listingTitle: String,
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requesterName: String,
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  donorName: String,
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('DonationRequest', donationRequestSchema);
