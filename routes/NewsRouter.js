const express = require('express')
const mongoose = require('mongoose')
const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const router = express.Router()
const Article = require('../models/Schema')
const Image = require('../models/Schema')


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


// router.delete('/:id', async (req, res) => {
//     await Article.findByIdAndDelete(req.params.id)
//     // res.redirect('/admin/news/All')
// })




// router.put('/:id', async (req, res, next) => {
//     req.article = await Article.findById(req.params.id)
//     next()
// }, saveArticleAndRedirect('edit'))

// function saveArticleAndRedirect(path) {
//     return async (req, res) => {
//         let article = req.article
//         article.title = req.body.title
//         article.description = req.body.description
//         article.markdown = req.body.markdown
//         try {
//             article = await article.save()
//             res.redirect(`/articles/${article.slug}`)
//         } catch (e) {
//             res.render(`articles/${path}`, { article: article })
//         }
//     }
// }


const mongoURI = "mongodb+srv://Idrok:riskiddin98@cluster0.thx7q.mongodb.net/article"

// connection
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, console.log('2-mongodb'))


// init gfs
let gfs
conn.once("open", () => {
    // init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    })
})

// Storage
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename = buf.toString("hex") + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads"
                }
                resolve(fileInfo)
            })
        })
    }
})
//const storage = new GridFsStorage({ url: mongoURI }) // soddaroq usuli

const upload = multer({
    storage
})

// route'lar
router.get("/images", async (req, res) => {


    gfs.find().toArray(async (err, files) => {
        const f = files
            .map(file => {
                if (
                    file.contentType === "image/png" ||
                    file.contentType === "image/jpeg"
                ) {
                    file.isImage = true
                } else {
                    file.isImage = false
                }
                return file

            })
            .sort((a, b) => {
                return (
                    new Date(b["uploadDate"]).getTime() -
                    new Date(a["uploadDate"]).getTime()
                )
            })
        res.render('admin/index', { files: f })
    })
})

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.end('error request file');
        }

        var data = new Image({
            name: req.body.name,
            image: req.body.file
        });
        data.save().then((result) => {
            //res.send(result);
            //res.redirect('/')
            console.log('saved')
        });
        console.log(req.file);
        //res.end('upload file success');
        //res.redirect('/')
        res.redirect('/')
        console.log('success');
    })
})

// const upload = multer({ storage }).single('file');
router.post("/upload", upload.single('file'), async (req, res) => {

    // upload(req, res => {
    //     let image = new Image({
    //         uploadDate: req.body.uploadDate
    //     })
    // })
    // await image.save()
    // res.send(image)
    res.redirect("/admin/news/images")

})

router.get("/files", (req, res) => {
    gfs.find().toArray((err, files) => {
        // fayl mavjudligini tekshiramiz
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: "bironta ham fayl mavjud emas"
            })
        }

        return res.json(files)
    })
})

router.get("/files/:filename", (req, res) => {
    gfs.find(
        {
            filename: req.params.filename
        },
        (err, file) => {
            if (!file) {
                return res.status(404).json({
                    err: "bunday fayl mavjud emas"
                })
            }

            return res.json(file)
        }
    )
})

router.get("/image/:filename", (req, res) => {
    const file = gfs
        .find({
            filename: req.params.filename
        })
        .toArray((err, files) => {
            gfs.openDownloadStreamByName(req.params.filename).pipe(res)
        })
})

// files/del/:id
// faylni database'dan o'chiramiz
router.post("/files/del/:id", (req, res) => {
    gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
        if (err)
            return res.status(404).json({ err: err.message })

        res.redirect("/admin/news/images")
    })
})

module.exports = router