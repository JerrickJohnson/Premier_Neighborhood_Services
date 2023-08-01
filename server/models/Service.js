const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    category: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String
    },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
