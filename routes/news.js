const express = require('express')
const path = require('path')
const formidable = require('formidable')
const News = require('../models/News')
const fileUpload = require('express-fileupload')
const { url } = require('inspector')
const router = express.Router({ mergeParams: true })


router.post('/All', async (req, res, next) => {
  
  let news = await News.create(req.body)

  const file = req.files.file;

  // Create custom file name
  file.name = `photo_${news._id}${path.parse(file.name).ext}`;
  file.mv(`../public/uploads/ + ${file.name}`, async err => {
    if (err) {
      console.error(err);
    } else {
      console.log('upload')
    }
  });
  const { title, newsBody } = req.body;
  const photo = file.name;
  news = await News.findByIdAndUpdate(news._id, {
    photo
  }, {
    new: true,
    runValidators: true
  });

  await news.save()
  res.redirect('/admin/news/All')

})


router.get('/', async (req, res) => {
  let news = await News.find()
  res.render('admin/news')
})

router.get('/All', async (req, res) => {
  let articles = await News.find().sort({ createdAt: 'desc' })
  res.render('admin/news_All', { articles: articles })
})






// By id////////////////////////////////////////////////////////////////////////////////////////////
router.get('/:id', async (req, res) => {
  let news = await News.findById(req.params.id)
  if (!news)
    return next(res.send(`News not found with  id of ${req.params.id}`, 404))
})

// update
router.get('/edit/:id', async (req, res) => {
  let article = await News.findById(req.params.id)
  res.render('admin/edit_News', { article: article })
})

router.post('/edit/:id', async (req, res) => {
  let news = await News.findByIdAndUpdate(req.params.id, req.body)

  await news.save()
  res.redirect('/admin/news/All')
})

// delete
router.post('/All/:id', async (req, res) => {
  let news = await News.findByIdAndDelete(req.params.id)
  res.redirect('/admin/news/All')
})



module.exports = router
