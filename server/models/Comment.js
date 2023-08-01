const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;