const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    phoneNumber: String,
    profileImage: String,
    bookings: [String], // array of CinemaSession ids
    watchlist: [String], // array of Movie ids
})

module.exports = mongoose.model('User', UserSchema)
