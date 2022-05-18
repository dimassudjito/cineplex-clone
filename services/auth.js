const jwt = require('jsonwebtoken')

module.exports = {
    verify: (req) => {
        const authHeader = req.headers.authorization
        if (!!authHeader) {
            const token = authHeader.split('Bearer ')[1]
            if (!!token) {
                try {
                    const user = jwt.verify(token, process.env.SECRET_KEY)
                    return user
                } catch (err) {
                    throw new Error('Auth error: invalid/expired token')
                }
            }
            throw new Error(
                "Auth error: authentication token must be 'Bearer [token]'"
            )
        }
        throw new Error('Auth error: authentication header must be provided')
    },
}
