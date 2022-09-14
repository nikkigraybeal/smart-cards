const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')
const Schema = mongoose.Schema

const cardSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  public: {
    type: Boolean,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  links: {
    type: String,
    equired: false
    },
  answer: {
    type: String,
    required: true, 
  }
})

const Card = mongoose.model('Card', cardSchema)
module.exports = Card