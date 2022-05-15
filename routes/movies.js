const express = require('express')
const moviesController = require('../controllers/movies')

const router = express.Router()

router.get('/', moviesController.getAll)
router.get('/:movieId', moviesController.getOne)
router.post('/', moviesController.create)
router.delete('/:movieId', moviesController.delete)
router.put('/:movieId', moviesController.update)

module.exports = router
