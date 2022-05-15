const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = {
  getAll: async (req, res) => {
    res.send('test user route')
  }
}
