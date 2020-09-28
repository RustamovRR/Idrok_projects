const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

app.get('/', (req, res) => {
    res.json({
        message: 'welcome'
    })
})

app.post('/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'post created',
                authData
            })
        }
    })

})

app.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    }

    jwt.sign({ user: user }, 'secret', (err, token) => {
        res.json({
            token
        })
    })
})

function verifyToken(req, res, next) {
    const barerHeader = req.header['authorization']
    if (typeof barerHeader !== 'undefined') {
        const bearer = barerHeader.split('')
        const barerToken = bearer[1]
        req.token = barerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`${port}chi portni eshitishni boshladim...`);
});

