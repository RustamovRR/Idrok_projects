const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
const helmet = require('helmet')
const fileupload = require('express-fileupload')
const app = express()

const usersRouter = require('./routes/page')
const NewsRouter = require('./routes/news')
const CourseRouter = require('./routes/course')
const AuthRouter = require('./routes/auth')

mongoose.connect('mongodb+srv://riskiddin98:riskiddin98@cluster0.d5xmv.mongodb.net/article', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(console.log('mongodbga ulandi...'))


app.set('view engine', 'ejs')
// app.use(express.static(__dirname + '/items'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileupload());

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', usersRouter)
app.use('/admin/news', NewsRouter)
app.use('/admin/course', CourseRouter)
app.use('/auth', AuthRouter)


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port}chi portni eshitishni boshladim...`);
});
