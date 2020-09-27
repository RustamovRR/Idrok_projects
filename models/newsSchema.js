const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    date: {
        type: Date,
        default: new Date().toLocaleString()
    }
})

const News = mongoose.model('News', newsSchema)
module.exports = News