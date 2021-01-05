// declare
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const port = 3000
const app = express()

// engine setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

// route
app.get('/', (req, res) => {
  res.render('index')
})

// port listening
app.listen(port, () => {
  console.log(`App is listening to http://localhost:${port}`)
})
