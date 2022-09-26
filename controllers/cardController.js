const jwt = require('jsonwebtoken')
const Card = require('../models/card')
const utils = require('../utils')

module.exports.home_get = (req, res) => { 
  let userSetInfo = []
  Card.find({ public: 'on'})
    .then(result => {
      const setInfo = utils.getSetInfo(result)
      res.render('index', { title: 'Home', setInfo, userSetInfo })
    })
    .catch(err => {
      console.log(err)
    }) 
}

module.exports.user_home_get = (req, res) => {
  let setInfo
  let userSetInfo
  const token = req.cookies.jwt 
  // check json web token exists and is verified
  if (token) {
    jwt.verify(token, 'my secret', (err, decodedToken) => {
      Card.find({ public: 'on'})
        .then(result => {
          setInfo = utils.getSetInfo(result)
          Card.find({ authorId: decodedToken.id })
            .then(result => {
              userSetInfo = utils.getSetInfo(result)
              res.render('index', { title: 'Home', setInfo, userSetInfo})
            })
        })
        .catch(err => {
          console.log(err)
        })  
    })
  }
  else {
    res.redirect('/login')
  }
}

module.exports.set_get = (req, res) => {
  const subcategory = req.params.subcategory
  const title = req.params.title

  Card.find({ subcategory, title })
    .then(result => {
      res.render('details', { title: 'Details', result })
    })
    .catch(err => {
      console.log(err)
    }) 
}

module.exports.set_delete = (req, res) => {
  const subcategory = req.params.subcategory 
  const title = req.params.title

  Card.deleteMany({subcategory, title})
    .then((result) => {
      res.json({ redirect: '/home' })
    })
    .catch(err => console.log(err))
}

module.exports.create_get = (req, res) => {
  const setInfo = []
  res.render('create', { title: 'Create New Set', setInfo })
}

module.exports.create_post = (req, res) => {
  const card = new Card(req.body)

  card.save()
    .then(result => {
      res.render('create', { title: 'Create New Cards', setInfo: result })
    })
    .catch(err => {
      console.log(err)
    }) 
}