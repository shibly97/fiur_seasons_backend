const express = require('express')
const router = express.Router()

// router.use('/otp', require('./otp'))
// router.use('/resetPassword', require('./resetPassword'))
router.use('/category', require('./category'))
router.use('/', require('./room'))
// router.use('/checkLog', require('./checkLog'))


module.exports = router