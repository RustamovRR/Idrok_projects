const express = require('express');
const fileUpload = require('express-fileupload');
const News = require('../models/News')
const router = express.Router({ mergeParams: true });
const {
  getAllNews,
  getSingleNews,
  createNews,
  updateNews,
  deleteNews
} = require('../controllers/news');
// router.use(protect);
// router.use(authorize('admin'));

router
  .route('/')

router
  .route('/all')
  .get(getAllNews)
  .post(createNews);

router
  .route('/:id')
  .post(deleteNews)


router.get('/', async (req, res) => {

  // res.redirect('/api/auth')

  let articles = await News.find().sort({ createdAt: 'desc' })
  res.render('admin/news', { articles: articles })
})

router.get('/all', async (req, res) => {
  let articles = await News.find().sort({ createdAt: 'desc' })
  res.render('admin/news_All', { articles: articles })
})

router.get('/edit/:id', async (req, res) => {
  const article = await News.findById(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.render('admin/edit_News', { article: article })
  if (!article) return next(new errorResponse(`Not found user with  id of ${req.params.id}`, 404))

})

router.post('/edit/:id', async (req, res) => {
  const article = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  await article.save()
  res.redirect('/api/news/all')

})



module.exports = router;