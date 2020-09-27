const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    date: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('Article', articleSchema)