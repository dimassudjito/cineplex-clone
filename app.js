const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const dotenv = require('dotenv')

const moviesRouter = require('./routes/movies')

// general setup
const PORT = 5000
const app = express()
dotenv.config()

// connect to mongodb
mongoose.connect(process.env.MONGODB_ADDR, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// handle routing
app.use(bodyParser.json())
app.use('/movies', moviesRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
