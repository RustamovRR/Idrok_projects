const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect('mongodb+srv://riskiddin98:riskiddin98@cluster0.d5xmv.mongodb.net/article', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
        .then(console.log('mongodbga ulandi...'))
}

module.exports = connectDB;