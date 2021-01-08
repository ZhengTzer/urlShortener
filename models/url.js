const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { nanoid } = require('nanoid')

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
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('urlShortenerTables', recordSchema)
