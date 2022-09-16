const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { result } = require('lodash')
const { render } = require('ejs')
const Card = require('./models/card')


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

// routes
app.get('/', (req, res) => {
  Card.find()
    .then(result => {
      res.render('index', { title: 'Home', result })
      
    })
    .catch(err => {
      console.log(err)
    }) 
})

app.get('/login-signup', (req, res) => {
  res.render('login-signup', { title: 'Login or Signup' })
})

app.get('/create', (req, res) => {
  res.render('create', { title: 'Create New Set' })
})

app.post('/create', (req, res) => {
  const card = new Card(req.body)

  card.save()
    .then(result => {
      
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})