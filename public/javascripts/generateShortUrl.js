function sample(collection) {
  let randomIndex = Math.floor(Math.random() * collection.length)
  return collection[randomIndex]
}

function generateShortUrl() {
  // in case want to change short url option
  // define short url logic
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  // 2 symbol for url link
  const symbols = '-_'

  const options = {
    length: '5',
    lowercase: 'on',
    uppercase: 'on',
    numbers: 'on'
  }

  // create a collection to store
  let collection = []

  if (options.lowercase === 'on') {
    collection = collection.concat(lowerCaseLetters.split(''))
  }

  if (options.uppercase === 'on') {
    collection = collection.concat(upperCaseLetters.split(''))
  }

  if (options.numbers === 'on') {
    collection = collection.concat(numbers.split(''))
  }

  if (options.symbols === 'on') {
    collection = collection.concat(symbols.split(''))
  }

  // final short url
  let shortUrl = ''
  for (let i = 1; i <= options.length; i++) {
    shortUrl += sample(collection)
  }

  // return password
  return shortUrl
}

// export to other
module.exports = generateShortUrl
