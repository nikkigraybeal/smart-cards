const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Card = require('../models/card')
const User = require('../models/user')
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

module.exports.set_get = async (req, res) => {
  const subcategory = req.params.subcategory
  const title = req.params.title
  const author = req.params.author
  const userId = req.params.userId
  console.log("userID: ", userId)

  let result = await Card.find({ subcategory, title, author })
    
  result  = await utils.sortResult(result, userId)
  res.render('details', { title: 'Details', result })
    
   
}

module.exports.set_delete = (req, res) => {
  const subcategory = req.params.subcategory 
  const title = req.params.title
  const author = req.params.author

  Card.deleteMany({author, subcategory, title})
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

module.exports.edit_set_get = (req, res) => {
  res.render('edit-set', { title: 'Edit Set Info' })
}
module.exports.edit_set_post = (req, res) => {
  let public = req.body.public
  public === undefined ? public = "" : public = "on"
  Card.updateMany({ title: req.body.previousTitle, authorId: req.body.authorId}, 
                  { subject: req.body.subject,
                    subcategory: req.body.subcategory,
                    title: req.body.title,
                    public: public
                   })
    .then(result => {
      console.log(result)
      res.redirect('/home')
    })
                 
}
module.exports.edit_card_get = (req, res) => {
  res.render('edit-card', { title: 'Edit Card Info' })
}
module.exports.edit_card_post = (req, res) => {
  const userId = req.body.userId
  const author = req.body.author
  const subcategory = req.body.subcategory
  const title = req.body.title

  const cardId = mongoose.Types.ObjectId(req.body.cardId)
  Card.updateOne({ _id: cardId }, 
                  { $set: {
                    question: req.body.question,
                    answer: req.body.answer,
                    links: req.body.links
                  }
                    
                   })
    .then(result => {
      res.redirect(`/${userId}/${author}/${subcategory}/${title}`)
    })
}
module.exports.correct_post = async (req, res) => {
  const cardId = req.body.cardId
  const userId = req.body.userId
  const cardIdArr = []
  const user = await User.findById(userId)

  user.cardStats.forEach(stat => {
    cardIdArr.push(stat.cardId)
  })
  if (cardIdArr.includes(cardId)) {
    user.cardStats.forEach(stat => {
      if (cardId == stat.cardId) {
        stat.consecutiveCorrectAnswers += 1
        stat.lastViewed = Date.now()
      } 
    })
  } else {
    user.cardStats.push({ cardId, consecutiveCorrectAnswers: 1, lastViewed: Date.now() })
  }
  await user.save()
}
module.exports.incorrect_post = async (req, res) => {
  const cardId = req.body.cardId
  const userId = req.body.userId
  const cardIdArr = []
  const user = await User.findById(userId)

  user.cardStats.forEach(stat => {
    cardIdArr.push(stat.cardId)
  })
  if (cardIdArr.includes(cardId)) {
    user.cardStats.forEach(stat => {
      if (cardId == stat.cardId) {
        stat.consecutiveCorrectAnswers = 0
        stat.lastViewed = Date.now()
      } 
    })
  }
  await user.save()
}