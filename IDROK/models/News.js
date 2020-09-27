const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        minlength: [5, 'Title must me longer than 5 characters'],
        maxlength: [50, 'Title must me chorter than 50 characters']
    },
    newsBody: {
        type: String,
        required: [true, 'Please add a news` body'],
        minlength: [5, 'Title must me longer than 5 characters']
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
      },
    createdAt:{
        type : Date,
        default: Date.now
    },

})

module.exports = mongoose.model('News', newsSchema);