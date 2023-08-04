const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  orders: [Order.schema],
  dues: {
    type: Number,
    default: 500,
  },
  profileImage: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    required: false, //update to true later
  },
  dateOfBirth: {
    type: Date,
    required: false, //update to true later
  },
  phoneNumber: {
    type: String,
    required: false, //update to true later
  },
  emergencyContact: {
    name: {
      type: String,
      required: false, //update to true later
    },
    phone: {
      type: String,
      required: false, //update to true later
    },
  },
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;