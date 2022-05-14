const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')

const moviesRouter = require('./routes/movies')

const PORT = 5000

const app = express()

// connect to mongodb
var mongoDB =
  'mongodb+srv://dimas:bonantagon@cluster0.ijepu.mongodb.net/cineplex-clone?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// handle routing
app.use(bodyParser.json())
app.use('/movies', moviesRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
