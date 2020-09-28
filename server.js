const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const fileupload = require('express-fileupload')
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/error')
const config = require('config')
const exphbs = require('express-handlebars')

const app = express()



app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
dotenv.config({ path: './config/config.env' })

// Connect to database
connectDB()

//file uploading
app.use(fileupload())

// Set security headers
app.use(helmet())

// Set static folder
// app.use(express.static(path.join(__dirname, 'public')))
// Route files
const page = require('./routes/page')
// const users = require('./routes/user')
// const auth = require('./routes/auth')
const news = require('./routes/news')
const course = require('./routes/course')
const users = require('./routes/users')
const auth = require('./routes/authentification')



// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Mount routers
app.use('/', page)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/news', news)
app.use('/api/course', course)
app.use('/api/auth', auth)

app.use(errorHandler)
app.get('/', (req, res) => {
  res.send("Hello Server")
})
const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  // server.close(() => process.exit(1))
})
