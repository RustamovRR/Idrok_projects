const Users = require('../models/Users')
const express = require('express')
const router = express.Router()
const lodash = require('lodash')
const bcrypt = require('bcrypt')
const auth = require('../middlewares/auths')

router.get('/', (req, res) => {
    res.render('admin/login')
})

router.get('/me', auth, async (req, res) => {
    const user = await Users.findById(req.user._id).select('-password')
    if (!user)
        res.send('foydalanuvchi topilmadi')
    res.send(user);
});


router.post('/', async (req, res) => {

    let user = await Users.findOne({ email: req.body.email })
    if (user)
       res.redirect('/api/news')

    user = new Users(lodash.pick(req.body, ['name', 'email', 'password', 'isAdmin']))
    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()

    res.send(lodash.pick(user, ['_id', 'name', 'email', 'isAdmin']))
})

module.exports = router 