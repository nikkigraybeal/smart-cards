const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

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
  username: {
    type: String
  }
})

// fire a function before doc saved to db with mongoose hooks
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email }) // this refers to model not an instance
  if (user) {
    const auth = await bcrypt.compare(password, user.password) // bcrypt hashes unhashed password entered by login
    if (auth) {
      console.log("user from model: ", user)
      return user
    } 
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

const User = mongoose.model('user', userSchema)

module.exports = User