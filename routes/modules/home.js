const express = require('express')
const router = express.Router()
const urlShortenerTables = require('../../models/url')
const { nanoid } = require('nanoid')

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
  console.log(req.headers.host)
  const longUrl = req.body.longUrl
  const date = new Date().toLocaleDateString()

  // refer to bit.ly which provide 7 digit shortenUrl
  const shortUrl = nanoid(7)
  return urlShortenerTables
    .create({
      longUrl,
      shortUrl,
      date
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// module export
module.exports = router
