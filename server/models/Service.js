const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  username: {
    type: String,
  },
  review: {
    type: String,
  },
  rating: {
    type: Number,
  },
  // timestamps: true 
});

const serviceSchema = new Schema({
  businessName: {
    type: String,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  rating: {
    type: Number
  },
  reviews: [reviewSchema],
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'ServiceCategory' 
  }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
