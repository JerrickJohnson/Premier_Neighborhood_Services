const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    attendees: {
        type: Number,
        min: 0,
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;