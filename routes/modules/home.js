const express = require('express')
const router = express.Router()
const urlShortenerTables = require('../../models/url')

// index page
router.get('/', (req, res) => {
  urlShortenerTables
    .find()
    .lean()
    .sort({ date: 'desc' })
    .then((url) => res.render('index', { url }))
    .catch((error) => console.log(error))
})

router.post('/', (req, res) => {
  const longUrl = req.body.longUrl
  const date = new Date().toLocaleString()
  console.log(longUrl, date)
  return urlShortenerTables
    .create({
      longUrl,
      date
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// module export
module.exports = router
