const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { result } = require('lodash')
const { render } = require('ejs')

const card1 = {
  id: 1,
  question: 'Define Meiosis and make this a super long question with lots of parts so it takes up tons of space. The longer the better so I can make sure the container expands to fit the content.',
  answer: 'The stage following meiosis II that involves the physical separation of four haploid gametes that are genetically different.',
  links: ['www.google.com', 'www.wikipedia.com'],
  effort: 'hard',
  lastSeen: new Date()
}
const card2 = {
  id: 2,
  question: 'Define Metaphase I',
  answer: 'The stage of meiosis I in which homologous chromosomes in tetrads are aligned in the middle of the cell along the metaphase plate.',
  links: ['www.google.com', 'www.wikipedia.com'],
  effort: 'hard',
  lastSeen: new Date()
}
const card3 = {
  id: 3,
  question: 'Define Prophase I',
  answer: 'The stage of meiosis I in which the DNA condenses, centrosomes move to the poles, and homologous chromosomes organize into tetrads and undergo crossing-over.',
  links: ['www.google.com', 'www.wikipedia.com'],
  effort: 'hard',
  lastSeen: new Date()
}
const set1 = {
  subject: 'science',
  subcategory: 'biology',
  title: 'meiosis',
  author: 'user1',
  public: true,
  cards: [card1, card2, card3]
}

// express app
const app = express()

// connect to MongoDB
const dbURI = "mongodb+srv://nikkig:MQ84Dt5jqzKc9U2@smart-cards.kakvmvn.mongodb.net/smart-cards?retryWrites=true&w=majority"

//listen for requests
app.listen(3000)

//register view engine
app.set('view engine', 'ejs')

// middleware and static files
app.use(express.static('public'))
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', set1 })
})

app.get('/login-signup', (req, res) => {
  res.render('login-signup', { title: 'Login or Signup' })
})

app.get('/create-set', (req, res) => {
  res.render('create-set', { title: 'Create New Set' })
})

app.get('/create-card', (req, res) => {
  res.render('create-card', { title: 'Create Cards' })
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})