const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors')
const helmet = require('helmet');
const fileupload = require('express-fileupload');
const connectDB = require('../config/db');
const errorHandler = require('./middlewares/error');
const bodyparser = require('body-parser')

const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

//file uploading
app.use(fileupload());

// Set security headers
app.use(helmet());

// Set static folder
app.use(express.static(path.join(__dirname,'public')));
// Route files
const users = require('./routes/user');
const auth = require('./routes/auth');
const news = require('./routes/news');
const course = require('./routes/course');


// Body parser
app.use(bodyparser.json());
app.use(express.urlencoded());

// Mount routers
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/news', news);
app.use('/api/courses', course);

app.use(errorHandler);
app.get('/', (req,res)=>{
  res.send("Hello Server")
})
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    // server.close(() => process.exit(1));
  });
  