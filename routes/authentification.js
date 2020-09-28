const Users = require('../models/Users')
const express = require('express')
const router = express.Router()
const lodash = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const admin = require('../middlewares/admin')

router.get('/', (req, res) => {
    res.render('admin/login')
})

router.post('/', async (req, res, next) => {

    let user = await Users.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Email yoki parol noto\'g\'ri');

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword)
        return res.status(400).send('Email yoki parol noto\'g\'ri');

    const token = jwt.sign({ _id: user._id }, 'idrok2020')
    res.header('x-auth-token', token).send(true);

    next()
});

module.exports = router 