const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: String,
  },
  likes: {
    type: Number, 
    default: 0 
  },
});

const eventSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  location: {
    type: String,
  },
  host: { 
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  attendees: { 
    type: Number,
    default: 0,
  },
  isPublic: { 
    type: Boolean, 
    default: true 
  },
  likes: { 
    type: Number, 
    default: 0 
  },
  // comments: [commentSchema],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;