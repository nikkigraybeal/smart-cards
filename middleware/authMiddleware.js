const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = (req, res, next) => {
  
  const token = req.cookies.jwt 

  // check json web token exists and is verified
  if (token) {
    jwt.verify(token, 'my secret', (err, decodedToken) => {
      if (err) {
        res.redirect('/login')
        console.log(err.message)
      } else {
        console.log(decodedToken)
        next()
      }
    })
  }
  else {
    res.redirect('/login')
  }
}

// check current user and make user available to views
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, 'my secret', async (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.locals.user = null
        next()
      } else {
        console.log(decodedToken) // decodedToken contains id
        let user = await User.findById(decodedToken.id)
        res.locals.user = user // available inside all views
        next()
      }
    })
  }
  else {
    res.locals.user = null
    next()
  }
}

module.exports = { requireAuth, checkUser }