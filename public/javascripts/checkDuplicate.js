const urlShortenerTables = require('../../models/url')

async function checkDuplicate(shortUrl) {
  try {
    let shortUrlFound = await urlShortenerTables.findOne({
      shortUrl: shortUrl
    })
    if (shortUrlFound) return true
    else return false
  } catch (error) {
    console.log(error)
  }
}

// export to other
module.exports = checkDuplicate
