const mongoose = require('mongoose')
const User = require('./models/user')


// create object to pass set info to views
const getSetInfo = (cards) => {
  const setInfo = {}
  cards.forEach(card => {
    if (!(card.subject in setInfo)) {
      setInfo[card.subject] = {}
    }
  })
  cards.forEach(card => {
    if (!(card.subcategory in setInfo[card.subject])) {
      setInfo[card.subject][card.subcategory] = {}
    }
  })
  cards.forEach(card => {
    if (!(card.title in setInfo[card.subject][card.subcategory])) {
      setInfo[card.subject][card.subcategory][card.title] = card.author
    }
  })
  // {subject: {subcategory: {title: author}}
  return setInfo
}

const keepCard = (statsObj) => {
  const today = Date.now()
  const daysSinceLastView = Math.round((today - statsObj.lastViewed) / (86400 * 1000))
  
  if (daysSinceLastView >= statsObj.consecutiveCorrectAnswers) {
    return true
  }
  return false
}

// remove cards from set that user has recently answered correctly
const sortResult = async (result, userId) => {
  const user = await User.findById(userId)
  const statsArr = user.cardStats  // arrray of objects - stats for all cards viewed statsArr.cardId
  const idArr = statsArr.map(cardStats => cardStats.cardId)
  const sorted = []

  result.forEach(card => {
    const card_id = card._id.valueOf()
    !idArr.includes(card_id) ? sorted.push(card) : 
      statsArr.forEach(cardStats => {
        if (card_id === cardStats.cardId && (keepCard(cardStats))) {
          sorted.push(card)
        }
    })
  })
  return sorted
}

module.exports = {
  getSetInfo,
  sortResult
}