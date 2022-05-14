const express = require('express')
const mongoose = require('mongoose')

const moviesRouter = require('./routes/movies')

const PORT = 5000

const app = express()

// connect to mongodb
var mongoDB =
  'mongodb+srv://dimas:bonantagon@cluster0.ijepu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// specify routes
app.use('/movies', moviesRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
