const mongoose = require('mongoose');

const connectDB = async () =>{
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/IdrokTalim', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`MongoDB connected ${conn.connect.host}`.cyan.underline.bold );
}

module.exports = connectDB;