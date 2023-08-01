const mongoose = require('mongoose');

const { Schema } = mongoose;

const paymentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  paymentPurpose: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed'],
    default: 'pending'
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;