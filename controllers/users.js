const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function generateToken(user) {
  // REFACTOR use deconstruction
  // REFACTOR move it to services
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name
    },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  )
}

module.exports = {
  getAll: async (req, res) => {
    res.send('test user route')
  },
  register: async (req, res, next) => {
    // REFACTOR to use deconstruction
    // TODO validate user data
    // check if email is already used
    const existingUser = await User.findOne({ email: req.body.email })
    if (!!existingUser) {
      res.json({ message: 'Registration error: email is already used' })
      return
    }
    // hash password
    password = await bcrypt.hash(req.body.password, 12)
    // create user
    const user = new User({
      email: req.body.email,
      password,
      name: req.body.name
    })
    try {
      const savedUser = await user.save()
      const token = generateToken(savedUser)
      res.json({ ...savedUser, token })
    } catch (err) {
      res.json({ message: err })
    }
  }
}
