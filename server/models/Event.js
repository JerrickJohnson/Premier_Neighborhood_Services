const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date
    },
    description: {
        type: String,
        required: true,
    },
    attendees: {
        type: Number,
        min: 0,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;