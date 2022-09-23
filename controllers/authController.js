const User = require('../models/user')

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = { email: '', password: ''}

  // duplicate error code
  if (err.code === 11000) {
    errors.email  = 'that email is already registered'
    return errors
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {  // destructure properties from error.properties
      errors[properties.path] = properties.message
    })
  }

  return errors
}

module.exports.signup_get = (req, res) => {
  res.render('signup', { title: 'Signup'})
}

module.exports.login_get = (req, res) => {
  res.render('login', { title: 'Login'})
}

module.exports.signup_post = async (req, res) => {
  const { email, password, userName } = req.body 

  console.log(email, password, userName)
  
  try {
    const user = await User.create({ email, password, userName })
    res.status(201).json(user)
  } 
  catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)

  console.log(email, password)
  res.send('user login')
}