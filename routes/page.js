const express = require('express')
const News = require('../models/News')
const Course = require('../models/Course')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('user/home')
})
router.get('/news', async (req, res) => {
    let articles = await News.find().sort({ createdAt: 'desc' })
    res.render('user/news', { articles: articles })
})

router.get('/news/:id', async (req, res) => {
    let article = await News.findById(req.params.id)
    res.render('user/read_more', { article: article })
})



router.get('/course', async (req, res) => {
    let courses = await Course.find().sort({ createdAt: 'desc' })
    res.render('user/course', { courses: courses })
})

router.get('/course/:id', async (req, res) => {
    let course = await Course.findById(req.params.id)
    res.render('user/course_link', { course: course })
})


router.get('/contact', (req, res) => {
    res.render('user/contact')
})
router.get('/contact_link', (req, res) => {
    res.render('user/contact_link')
})
router.get('/read_more', (req, res) => {
    res.render('user/read_more')
})
router.get('/course_link', (req, res) => {
    res.render('user/course_link')
})
router.get('/about', (req, res) => {
    res.render('user/about')
})

module.exports = router