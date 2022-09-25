const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { render } = require('ejs')
const authRoutes = require('./routes/authRoutes')
const cardRoutes = require('./routes/cardRoutes')
const { checkUser } = require('./middleware/authMiddleware')

// express app
const app = express()

// connect to MongoDB
const dbURI = "mongodb+srv://nikkig:MQ84Dt5jqzKc9U2@smart-cards.kakvmvn.mongodb.net/smart-cards?retryWrites=true&w=majority"

mongoose.connect(dbURI)
  .then(result => {
    app.listen(3000) //listen for requests
  })
  .catch(err => {
    console.log(err)
  })

//register view engine
app.set('view engine', 'ejs')

// middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// routes
app.get('*', checkUser)
app.post('*', checkUser)
app.use(cardRoutes)
app.use(authRoutes)

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})