const express = require('express')
const router = express.Router()
const urlShortenerTables = require('../../models/url')
const generateShortUrl = require('../../public/javascripts/generateShortUrl.js')
const QRCode = require('qrcode')

// index page
router.get('/', (req, res) => {
  urlShortenerTables
    .find()
    .lean()
    .sort({ date: 'desc' })
    .then((url) => res.render('index', { url }))
    .catch((error) => console.log(error))
})

router.post('/', async (req, res) => {
  const longUrl = req.body.longUrl
  const host = 'https://fathomless-meadow-84873.herokuapp.com/'
  // specific date format
  const dateOptions = { hour12: false }
  const date = new Date().toLocaleString('en-US', dateOptions)
  let shortUrl = generateShortUrl()
  let checkDup = ''

  do {
    checkDup = urlShortenerTables
      .find({
        shortUrl: shortUrl
      })
      .countDocuments()
    shortUrl = generateShortUrl()
  } while (checkDup > 0)
  // end of check

  // generate qr code
  const qr = await QRCode.toDataURL(host + shortUrl)

  urlShortenerTables
    .create({
      date,
      longUrl,
      shortUrl,
      qr
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// link to long url
router.get('/:shortUrl', (req, res) => {
  const shortUrl = urlShortenerTables.findOne({
    shortUrl: req.params.shortUrl
  })
  if (shortUrl == null) return res.sendStatus(404)
  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.longUrl)
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
