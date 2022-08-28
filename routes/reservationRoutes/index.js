const express = require('express')
const router = express.Router()

// router.use('/otp', require('./otp'))
// router.use('/resetPassword', require('./resetPassword'))
router.use('/create', require('./create'))
router.use('/get', require('./get'))
router.use('/update', require('./update'))
// router.use('/', require('./room'))
// router.use('/checkLog', require('./checkLog'))


module.exports = router