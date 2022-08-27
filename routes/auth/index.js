const express = require('express')
const router = express.Router()

// router.use('/register', require('./register'))
// router.use('/otp', require('./otp'))
// router.use('/resetPassword', require('./resetPassword'))
router.use('/login', require('./login'))
// router.use('/checkLog', require('./checkLog'))


module.exports = router