const mongoose = require('mongoose')
const User = require('./models/user')

const getSetInfo = (cards) => {
  const setInfo = {}
  cards.forEach(card => {
    if (!(card.subject in setInfo)) {
      setInfo[card.subject] = {}
    }
  })
  //  {Science: {},
  //   History: {}
  //  }
  cards.forEach(card => {
    if (!(card.subcategory in setInfo[card.subject])) {
      setInfo[card.subject][card.subcategory] = []
    }
  })
  //  {Science: {biology: [], computer science: []},
  //   History: {american rev: []
  //  }
  cards.forEach(card => {
    if (!setInfo[card.subject][card.subcategory].includes(card.title)) {
      setInfo[card.subject][card.subcategory].push(card.title)
    }
  })
  //  {Science: {biology: [meiosis], computer science: [terminology]},
  //   History: {american rev: [people, places, events]
  //  }
  return setInfo
}

const updateCardStats = (cardId, userId) => {
  cardId = mongoose.Types.ObjectId(cardId)
  const cardIdArr = []
  User.findById(userId)
    .then(result => {
      result.cardStats.forEach(stat => {
        cardIdArr.push(stat.cardId)
      })
      if (cardIdArr.includes(cardId)) {
        result.cardStats.forEach(stat => {
          if (cardId === stat.cardId) {
            stat.consecutiveCorrectAnswers += 1
            stat.lastViewed = Date.now()
          } 
        })
      } else {
        result.cardStats.push({ cardId, consecutiveCorrectAnswers: 1, lastViewed: Date.now() })
      }
      console.log("utils cardstats: ", result.cardStats)
      return result.cardStats
      })
}

module.exports = {
  getSetInfo, 
  updateCardStats
}