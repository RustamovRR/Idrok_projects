const express = require('express')
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const path = require("path");
const app = express()
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");

const fs = require('fs')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded())

const mongoURI = "mongodb+srv://Idrok:riskiddin98@cluster0.thx7q.mongodb.net/blog"


MongoClient.connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
},


    function (error, client) {
        const blog = client.db('blog')
        console.log('Mongodbga ulanish hosil qilindi')


        // Admin pages///////////////////////////////////////////////////////////////////////////////////////////
        app.get('/admin2741', (req, res) => {
            res.render('admin/login')
        })


        // Pages render/////////////////////////////////////////////////////////////////////////////////
        app.get('/', (req, res) => {
            res.render('user/home')
        })

        app.get('/news', (req, res) => {
            blog.collection('news_posts').find().sort({ defaultDate: -1 }).toArray((err, posts) => {
                res.render('user/news', { news_posts: posts })
            })
        })

        app.get('/course', (req, res) => {
            blog.collection('course_posts').find().toArray((err, posts) => {
                res.render('user/course', { course_posts: posts })
            })
        })

        app.get('/course_link', (req, res) => {
            blog.collection('course_link_posts').find().toArray((err, posts) => {
                res.render('user/course_link', { course_link_posts: posts })
            })
        })

        app.get('/about', (req, res) => {
            blog.collection('about_posts').find().toArray((err, posts) => {
                res.render('user/about', { about_posts: posts })
            })
        })

        app.get('/contact', (req, res) => {
            res.render('user/contact')
        })

        app.get('/contact_link', (req, res) => {
            res.render('user/contact_link')
        })

        app.get('/read_more', (req, res) => {
            res.render('user/read_more')
        })


        // Admin render pages/////////////////////////////////////////////////////////////////////////////////////////

        app.get('/admin2741/news', (req, res) => {
            blog.collection('news_posts').find().toArray((err, posts) => {
                res.render('admin/news', { news_posts: posts })
            })
        })

        app.get('/admin2741/news/edit/:id', (req, res) => {
            blog.collection('news_posts').findOne({
                '_id': ObjectId(req.params.id)
            }, function (err, post) {
                res.render('admin/edit_post', { post: post })
            })
        })

        app.post('/do-edit-news', (req, res) => {
            blog.collection('news_posts').updateOne({
                '_id': ObjectId(req.body._id)
            }, {
                $set: {
                    'title': req.body.title,
                    'content': req.body.content,
                    'date': req.body.date
                }
            }, function (err, post) {
                res.send('Update successful')
            })
        })


        app.get('/admin2741/course', (req, res) => {
            blog.collection('course_posts').find().toArray((err, posts) => {
                res.render('admin/course', { course_posts: posts })
            })
        })

        app.get('/admin2741/course/edit/:id', (req, res) => {
            blog.collection('course_posts').findOne({
                '_id': ObjectId(req.params.id)
            }, function (err, post) {
                res.render('admin/edit_post', { post: post })
            })
        })

        app.post('/do-edit-course', (req, res) => {
            blog.collection('news_posts').updateOne({
                '_id': ObjectId(req.body._id)
            }, {
                $set: {
                    'title': req.body.title,
                    'content': req.body.content,
                    'date': req.body.date
                }
            }, function (err, post) {
                res.send('Update successful')
            })
        })


        app.get('/admin2741/course_link', (req, res) => {
            blog.collection('course_link_posts').find().toArray((err, posts) => {
                res.render('admin/course_link', { course_link_posts: posts })
            })
        })

        app.get('/admin2741/about', (req, res) => {
            blog.collection('about_posts').find().toArray((err, posts) => {
                res.render('admin/about', { about_posts: posts })
            })
        })


        //  Post functions////////////////////////////////////////////////////////////////////////////////////////

        app.get('/posts/:id', (req, res) => {
            blog.collection('news_posts').findOne({ '_id': ObjectId(req.params.id) }, (err, post) => {
                res.render('user/read_more', {
                    post: post
                })
            })
        })


        app.post('/do-post', (req, res) => {
            res.send(req.body)
        })

        // Page posts///////////////////////////////////////////////////////////////////////////////////////



        app.post('/do-news-post', (req, res) => {
            blog.collection('news_posts').insertOne(req.body, (err, doc) => {
                res.send('posted')
            })
        })

        app.post('/do-news-delete', (req, res) => {
            blog.collection('news_posts').deleteOne({
                '_id': ObjectId(req.body._id)
            }, function () {
                res.send('delete successful')
            })
        })


        app.post('/do-course-post', (req, res) => {
            blog.collection('course_posts').insertOne(req.body, (err, doc) => {
                res.send('posted successful',)
            })
        })

        app.post('/do-course-delete', (req, res) => {
            blog.collection('course_posts').deleteOne({
                '_id': ObjectId(req.body._id)
            }, function () {
                res.send('delete successful')
            })
        })

        app.post('/do-course_link-post', (req, res) => {
            blog.collection('course_link_posts').insertOne(req.body, (err, doc) => {
                res.send('posted successful',)
            })
        })

        app.post('/do-course_link-delete', (req, res) => {
            blog.collection('course_link_posts').deleteOne({
                '_id': ObjectId(req.body._id)
            }, function () {
                res.send('delete successful')
            })
        })


        app.post('/do-course-edit-post', (req, res) => {
            blog.collection('course_link_posts').updateOne({
                '_id': ObjectId(req.body._id)
            }, {
                $set: {
                    'title': req.body.title,
                    'content': req.body.content
                }
            }, function (err, post) {
                res.send('Update successful')
            })
        })


        app.post('/do-about-post', (req, res) => {
            blog.collection('about_posts').insertOne(req.body, (err, doc) => {
                res.send('posted successful',)
            })
        })

        app.post('/do-about-delete', (req, res) => {
            blog.collection('about_posts').deleteOne({
                '_id': ObjectId(req.body._id)
            }, function () {
                res.send('delete successful')
            })
        })

        const port = process.env.PORT || 5000
        app.listen(port, () => console.log('tinglanmoqda...'))

    })

