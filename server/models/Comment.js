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
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;