const express = require('express')
const Article = require('../models/Schema')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('user/home')
})
router.get('/news', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('user/news', { articles: articles })
})

router.get('/news/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    // if (article == null) res.redirect('/')
    res.render('user/read_more', { article: article })
})


router.get('/contact', (req, res) => {
    res.render('user/contact')
})
router.get('/contact_link', (req, res) => {
    res.render('user/contact_link')
})
router.get('/course', (req, res) => {
    res.render('user/course')
})
router.get('/course_link', (req, res) => {
    res.render('user/course_link')
})
router.get('/read_more', (req, res) => {
    res.render('user/read_more', { articles: articles })
})
router.get('/about', (req, res) => {
    res.render('user/about')
})

module.exports = router