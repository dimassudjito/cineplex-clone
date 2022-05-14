const express = require('express')
const Movie = require('../models/Movie')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find()
    res.json(movies)
  } catch (err) {
    res.json({ message: err })
  }
})

router.get('/:movieId', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId)
    res.json(movie)
  } catch (err) {
    res.json({ message: err })
  }
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

router.delete('/:movieId', async (req, res) => {
  try {
    const removedMovie = await Movie.remove({ _id: req.params.movieId })
    res.json(removedMovie)
  } catch (err) {
    res.json({ message: err })
  }
})

router.put('/:movieId', async (req, res) => {
  try {
    const updatedMovie = await Movie.updateOne(
      { _id: req.params.movieId },
      { $set: req.body }
    )
    res.json(updatedMovie)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
