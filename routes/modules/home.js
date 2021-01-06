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
  const longUrl = req.body.longUrl

  // specific date format
  const dateOptions = { hour12: false }
  const date = new Date().toLocaleString('en-US', dateOptions)

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

// link to long url
router.get('/:id', (req, res) => {
  const id = req.params.id
  urlShortenerTables
    .aggregate([{ $match: { shortUrl: id } }], function (err, result) {
      longUrl = result[0].longUrl
    })
    .then(() => res.redirect(longUrl))
})

// remove
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return urlShortenerTables
    .findById(id)
    .then((deleteUrl) => deleteUrl.remove())
    .then(() => res.redirect('/'))
})

// module export
module.exports = router
