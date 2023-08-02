const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  username: String,
  review: String,
  rating: Number,
}, { timestamps: true });

const serviceSchema = new Schema({
  businessName: String,
  address: String,
  phoneNumber: String,
  rating: Number,
  reviews: [reviewSchema],
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'ServiceCategory' 
  }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
