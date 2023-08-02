const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    // required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
    // required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;