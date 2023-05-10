const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    threadId: {
        type: String
    },
    userId: {
        type: String
    },
    userName: {
        type: String
    },
    commentBody: {
        type: String
    },
    img: {
        type: String
    }
})

module.exports = mongoose.model('Comment', CommentSchema)