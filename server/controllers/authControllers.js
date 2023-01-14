const mongoConnections = require('../mongo')

async function userSignup (req, res, next) {
    const { username, email, password } = req.body

    const createdUser = {
        'username': username, // Check for existing username
        'email': email, // Check for existing email
        'password': password // Store hashed password
    }

    let mongoConnect = await mongoConnections.userSignup(req, res, next, createdUser)
    console.log(mongoConnect)
}

exports.userSignup = userSignup