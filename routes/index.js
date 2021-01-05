const express = require('express')
const router = express.Router()

// route
const home = require('./modules/home')

// route
router.use('/', home)

// module export
module.exports = router
