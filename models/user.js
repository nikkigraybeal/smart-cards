const mongoose = require('mongoose')
const { Schema } = mongoose.Schema
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true, // no custom error available- access via error ccode
    lowercase: true,
    validate: [ isEmail, 'Please enter a valid email'] // npm install validator for 3rd party validation
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  },
  userName: {
    type: String
  }
})

const User = mongoose.model('user', userSchema)

module.exports = User