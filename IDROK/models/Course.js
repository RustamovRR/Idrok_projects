const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    minlength: [5, 'Name must me longer than 5 characters'],
    maxlength: [200, 'Name must me chorter than 50 characters']
  },
  titleWhat: {
    type: String,
    required: [true, 'Please add a titleWhat'],
    minlength: [5, 'titleWhat must me longer than 5 characters'],
    maxlength: [200, 'titleWhat must me chorter than 50 characters']
  },
  titleWhy: {
    type: String,
    required: [true, 'Please add a titleWhy'],
    minlength: [5, 'titleWhy must me longer than 5 characters'],
    maxlength: [200 , 'titleWhy must me chorter than 50 characters']
  },
  bodyWhat: {
    type: String,
    required: [true, 'Please add a bodyWhat'],
    minlength: [5, 'bodyWhat must me longer than 5 characters']
  },
  bodyWhy: {
    type: String,
    required: [true, 'Please add a bodyWhy'],
    minlength: [5, 'bodyWhy must me longer than 5 characters']
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  photoWhat: {
    type: String,
    default: 'no-photo.jpg'
  },
  photoWhy: {
    type: String,
    default: 'no-photo.jpg'
  },
  during: {
    type: String,
    required: true
  },
  time: {
    type: String,
    default: '17:00-20:00'
  },
  days: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

})

module.exports = mongoose.model('Course', courseSchema);