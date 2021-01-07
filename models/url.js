const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  longUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true
  },
  clicks: {
    type: Number
  }
})

module.exports = mongoose.model('urlShortenerTables', recordSchema)
