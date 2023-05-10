const mongoose = require('mongoose')

const ThreadSchema = new mongoose.Schema({
    tmdbId: {
        type: String
    },
    userId: {
        type: String
    },
    userName: {
        type: String
    },
    threadTitle: {
        type: String
    },
    threadBody: {
        type: String
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    img: {
        type: String
    }
})

module.exports = mongoose.model('Thread', ThreadSchema)