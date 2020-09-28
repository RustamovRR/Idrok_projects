const path = require('path')
const asyncHandler = require('../middlewares/async')
const News = require('../models/News')
const errorResponse = require('../utils/errorResponse')

//@desc  Get all news
//@route  Get /api/news
//@access  public
exports.getAllNews = asyncHandler(async (req, res, next) => {
    const articles = await News.find().sort({ createdAt: 'desc' })
    res.render('admin/news_All', { articles: articles })
    // res.status(200).json({
    //     success: true,
    //     count: news.length,
    //     data: news

    // })
})

//@desc  Get single news
//@route  Get /api/news/:id
//@access  public
exports.getSingleNews = asyncHandler(async (req, res, next) => {
    const news = await News.findById(req.params.id)
    if (!news)
        return next(new errorResponse(`News not found with  id of ${req.params.id}`, 404))

    res.status(200).json({
        success: true,
        data: news
    })
})

//@desc  Create news
//@route  Post /api/news
//@access  private/admin
exports.createNews = asyncHandler(async (req, res, next) => {
    if (!req.files) {
        return next(new errorResponse(`Please upload a file`, 400))
    }

    const file = req.files.file

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new errorResponse(`Please upload an image file`, 400))
    }

    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new errorResponse(`Please upload an image less than 
        ${process.env.MAX_FILE_UPLOAD}`, 400))
    }

    let news = await News.create(req.body)

    // Create custom file name
    file.name = `photo_${news._id}${path.parse(file.name).ext}`
    file.mv(`public/uploadImage/newsImage/${file.name}`, async err => {
        if (err) {
            console.error(err)
            return next(new errorResponse(`Please upload an image less than `, 500))
        }
    })
    const { title, content_1, content_2, content_3 } = req.body
    const photo = file.name
    news = await News.findByIdAndUpdate(news._id, {
        photo
    }, {
        new: true,
        runValidators: true
    })

    res.redirect('/api/news/all')
    // res.status(200).json({
    //     success: true,
    //     data: news
    // })
})

//@desc  Update news
//@route  PUT /api/news/:id
//@access  Private/admin
exports.updateNews = asyncHandler(async (req, res, next) => {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!news) return next(new errorResponse(`Not found user with  id of ${req.params.id}`, 404))

    
    // res.status(200).json({
    //     success: true,
    //     data: news
    // })
})

//@desc  Delete  news
//@route  Delete /api/news/:id
//@access  private/admin
exports.deleteNews = asyncHandler(async (req, res, next) => {
    const news = await News.findByIdAndDelete(req.params.id)
    if (!news) return next(new errorResponse(`Not found user with  id of ${req.params.id}`, 404))
    // res.status(200).json({
    //     success: true,
    //     data: news
    // })
    res.redirect('/api/news/all')
})