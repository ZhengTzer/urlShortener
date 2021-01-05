// declare
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000
const app = express()

// engine setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

// db setting
require('./config/mongoose')

// route
const routes = require('./routes')
app.use(routes)

// port listening
app.listen(port, () => {
  console.log(`App is listening to http://localhost:${port}`)
})
