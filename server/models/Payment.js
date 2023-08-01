const paymentSchema = new Schema({
  paidBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'pending', // or 'completed'
    enum: ['pending', 'completed']
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;