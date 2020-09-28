const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  titleWhat_1: {
    type: String,
    default: 'Grafik dizaynerlik nima?'
  },
  title_1: {
    type: String,
  },
  content_1: {
    type: String,
  },
  titleWhat_2: {
    type: String,
    default: 'Kursning maqsadi nima?'
  },
  title_2: {
    type: String,
  },
  content_2: {
    type: String,
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  photo_1: {
    type: String,
    default: 'no-photo.jpg'
  },
  photo_2: {
    type: String,
    default: 'no-photo.jpg'
  },
  during: {
    type: String,
    default: '3-4'
  },
  time: {
    type: String,
    default: '17:00-20:00'
  },
  days: {
    type: String,
    default: 'Mon-Wen-Fri'
  },
  price: {
    type: String,
    default: '400 000'
  },
  createdAt: {
    type: Date,
    default: new Date().toLocaleString()
  },
})

module.exports = mongoose.model('Course', courseSchema);