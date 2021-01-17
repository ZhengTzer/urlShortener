const express = require('express')
const router = express.Router()
const urlShortenerTables = require('../../models/url')
const generateShortUrl = require('../../public/javascripts/generateShortUrl.js')
const checkDuplicate = require('../../public/javascripts/checkDuplicate.js')
const QRCode = require('qrcode')

// index page
router.get('/', async (req, res) => {
  try {
    let url = await urlShortenerTables.find().lean().sort({ date: 'desc' })
    res.render('index', { url })
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res) => {
  try {
    const longUrl = req.body.longUrl
    const host = 'https://fathomless-meadow-84873.herokuapp.com/'
    let shortUrl = ''

    // specific date format
    const dateOptions = { hour12: false }
    const date = new Date().toLocaleString('en-US', dateOptions)

    // check duplicate short url
    do {
      shortUrl = generateShortUrl()
    } while (await checkDuplicate(shortUrl))

    // generate qr code
    const qr = await QRCode.toDataURL(host + shortUrl)

    await urlShortenerTables.create({
      date,
      longUrl,
      shortUrl,
      qr
    })
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

// link to long url
router.get('/:shortUrl', async (req, res) => {
  try {
    const shortUrl = await urlShortenerTables.findOne({
      shortUrl: req.params.shortUrl
    })
    if (shortUrl == null) return res.sendStatus(404)
    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.longUrl)
  } catch (error) {
    console.log(error)
  }
})

// remove
router.delete('/:id', async (req, res) => {
  try {
    await urlShortenerTables.findByIdAndDelete(req.params.id)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

// module export
module.exports = router
