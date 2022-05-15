const Movie = require('../models/Movie')

module.exports = {
  getAll: async (req, res) => {
    try {
      const movies = await Movie.find()
      res.json(movies)
    } catch (err) {
      res.json({ message: err })
    }
  },
  getOne: async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.movieId)
      res.json(movie)
    } catch (err) {
      res.json({ message: err })
    }
  },
  create: async (req, res) => {
    const movie = new Movie(req.body)
    try {
      const savedMovie = await movie.save()
      res.json(savedMovie)
    } catch (err) {
      res.json({ message: err })
    }
  },
  delete: async (req, res) => {
    try {
      const deletedMovie = await Movie.deleteOne({ _id: req.params.movieId })
      res.json(deletedMovie)
    } catch (err) {
      res.json({ message: err })
    }
  },
  update: async (req, res) => {
    try {
      const updatedMovie = await Movie.updateOne(
        { _id: req.params.movieId },
        { $set: req.body }
      )
      res.json(updatedMovie)
    } catch (err) {
      res.json({ message: err })
    }
  }
}
