const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('dashboard', req.userContext?.userinfo)
})

module.exports = router