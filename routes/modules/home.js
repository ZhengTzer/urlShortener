const express = require('express')
const router = express.Router()
const urlShortenerTables = require('../../models/url')

// index page
router.get('/', (req, res) => {
  res.render('index')
})

// module export
module.exports = router
