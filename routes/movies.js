const express = require('express')
const Movie = require('../models/Movie')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('we are on movies')
})

router.post('/', async (req, res) => {
  const movie = new Movie(req.body)
  console.log(req.body)

  try {
    const savedMovie = await movie.save()
    res.json(savedMovie)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
