const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const router = express.Router()
const Article = require('../models/Schema')


router.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('admin/news', { articles: new Article() })
})

router.get('/All', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('admin/news_All', { articles: articles })

})

router.post('/All', async (req, res, next) => {

    let article = new Article({
        title: req.body.title,
        content: req.body.content,
        photo: req.files.file,
        date: req.body.date,
        createdAt: req.body.createdAt
    })

    await article.save()
    res.redirect('/admin/news/All')
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('admin/edit', { article: article })
})

//@desc  Upload photos for news
//@route  PUT /api/news/:id/photo
//@access  private/admin

// router.post('/:id/photo', async (req, res, next) => {
//     const news = await News.findById(req.params.id);
//     if (!news) return next(new errorResponse(`News not found  with  id of ${req.params.id}`, 404));

//     if (!req.files) {
//         return next(new errorResponse(`Please upload a file`, 400));
//     }

//     const file = req.files.file;

//     // Make sure the image is a photo
//     if (!file.mimetype.startsWith('image')) {
//         return next(new errorResponse(`Please upload an image file`, 400));
//     }

//     // Check file size
//     if (file.size > process.env.MAX_FILE_UPLOAD) {
//         return next(new errorResponse(`Please upload an image less than 
//         ${process.env.MAX_FILE_UPLOAD}`, 400));
//     }

//     // Create custom file name
//     file.name = `photo_${news._id}${path.parse(file.name).ext}`;
//     file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
//         if (err) {
//             console.error(err);
//             return next(new errorResponse(`Please upload an image less than `, 500));
//         }
//     });

//     const newss = await News.findByIdAndUpdate(req.params.id, { photo: file.name }, {
//         new: true,
//         runValidators: true
//     });
//     res.status(200).json({
//         success: true,
//         data: file.name
//     })
// })


router.post('/upload', (req, res, next) => {

    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        var oldPath = files.file.path;
        var newPath = path.join(__dirname, '../public/uploads')
            + '/' + files.file.name
        var rawData = fs.readFileSync(oldPath)

        fs.writeFile(newPath, rawData, function (err) {
            if (err) console.log(err)
            return res.send(oldPath)
        })
        res.render('admin/index', { files: files })
    })
})

module.exports = router