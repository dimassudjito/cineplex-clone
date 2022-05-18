const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const auth = require('../services/auth')

function generateToken(user) {
    // REFACTOR use deconstruction
    // REFACTOR move it to services
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    )
}

module.exports = {
    getProfile: async (req, res) => {
        let user
        try {
            user = auth.verify(req)
        } catch (err) {
            return res.status(400).json({ message: err.toString() })
        }
        res.send(user)
    },
    register: async (req, res, next) => {
        // REFACTOR to use deconstruction
        // TODO validate user data
        // check if email is already used
        const existingUser = await User.findOne({ email: req.body.email })
        if (!!existingUser) {
            return res
                .status(400)
                .json({ message: 'Registration error: email is already used' })
        }
        // hash password
        password = await bcrypt.hash(req.body.password, 12)
        // create user
        const user = new User({
            email: req.body.email,
            password,
            name: req.body.name,
        })
        try {
            const savedUser = await user.save()
            const token = generateToken(savedUser)
            res.json({ ...savedUser._doc, id: res._id, token })
        } catch (err) {
            res.status(400).json({ message: err })
        }
    },
}
