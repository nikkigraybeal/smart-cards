const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { result } = require('lodash')
const { render } = require('ejs')


// express app
const app = express()

//listen for requests
app.listen(3000)

//register view engine
app.set('view engine', 'ejs')

// middleware and static files
app.use(express.static('public'))
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' })
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