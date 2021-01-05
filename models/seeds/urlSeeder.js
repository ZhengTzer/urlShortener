// mongoose connection
const db = require('../../config/mongoose')
const urlModel = require('../url')

// add seed data
db.once('open', () => {
  const promises = []
  promises.push(
    urlModel.create(
      {
        date: '1/5/2021, 2:02:31 PM',
        longUrl: 'https://www.youtube.com/',
        shortUrl: 'test',
        clicks: '123'
      },
      {
        date: '1/4/2021, 2:02:31 PM',
        longUrl: 'https://www.facebook.com/',
        shortUrl: 'test2',
        clicks: '456'
      }
    )
  )
  Promise.all(promises).then(() => {
    console.log('insert sample record data, done!')
    db.close()
  })
})
