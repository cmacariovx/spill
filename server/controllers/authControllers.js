const mongoConnections = require('../mongo')
const bcrypt = require('bcryptjs')

async function userSignup (req, res, next) {
    const { username, email, password } = req.body

    let hashedPassword = await bcrypt.hash(password, 12)

    const createdUser = {
        'username': username,
        'email': email,
        'password': hashedPassword
    }

    let mongoConnect = await mongoConnections.userSignup(req, res, next, createdUser)
    console.log(mongoConnect)
}

async function userLoginMain (req, res, next) {
    const { username, password } = req.body

    let userCredentials = {
        "username": username,
        "password": password
    }

    let mongoFindUser = await mongoConnections.userLogin(req, res, next, userCredentials)

    if (!mongoFindUser) {
        console.log("User not found")
        return null
    }

    console.log(mongoFindUser)

    let isValidPassword = await bcrypt.compare(password, mongoFindUser.password)

    if (!isValidPassword) {
        console.log("Invalid Credentials")
    }
    else console.log("Success")
}

exports.userSignup = userSignup
exports.userLoginMain = userLoginMain