const mongoose = require('mongoose');

const foodListingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: {
    type: String, required: true,
    enum: ['Fruits & Vegetables', 'Dairy Products', 'Baked Goods', 'Cooked Meals', 'Canned Food', 'Beverages', 'Snacks', 'Other']
  },
  quantity: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  location: { type: String, required: true },
  image: String,
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  donorName: String,
  status: { type: String, enum: ['available', 'claimed', 'expired'], default: 'available' },
}, { timestamps: true });

foodListingSchema.index({ title: 'text', description: 'text', location: 'text' });
foodListingSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('FoodListing', foodListingSchema);
