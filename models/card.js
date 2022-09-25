const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: [true, 'subject field is required']
  },
  subcategory: {
    type: String,
    required: [true, 'subcategory field is required']
  },
  title: {
    type: String,
    required: [true, 'title field is required']
  },
  public: {
    type: String,
    required: false
  },
  question: {
    type: String,
    required: [true, 'question field is required']
  },
  links: {
    type: String,
    required: false 
    },
  answer: {
    type: String,
    required: [true, 'answer field is required'] 
  }
})


const Card = mongoose.model('Card', cardSchema)
module.exports = Card