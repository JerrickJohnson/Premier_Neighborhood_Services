const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: String,
  comment: String,
  likes: { type: Number, default: 0 },
}, { timestamps: true });

const eventSchema = new Schema({
  name: String,
  description: String,
  date: Date,
  location: String,
  host: { type: Schema.Types.ObjectId, ref: 'User' },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isPublic: { type: Boolean, default: true },
  likes: { type: Number, default: 0 },
  comments: [commentSchema],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;