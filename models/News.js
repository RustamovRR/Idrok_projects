const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    content_1: {
        type: String,
    },
    content_2: {
        type: String,
    },
    content_3: {
        type: String,
    },
    date: {
        type: String
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('News', newsSchema);