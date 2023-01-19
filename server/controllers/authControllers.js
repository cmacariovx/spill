const mongoConnections = require('../mongo')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()

const jwtSecret = process.env.JWT_SECRET

async function userSignup (req, res, next) {
    const { username, email, password } = req.body

    let hashedPassword = await bcrypt.hash(password, 12)

    const createdUser = {
        'username': username,
        'email': email,
        'password': hashedPassword
    }

    let mongoConnect = await mongoConnections.userSignup(req, res, next, createdUser)
}

async function userLoginMain (req, res, next) {
    const { username, password } = req.body

    let userCredentials = {
        "username": username,
        "password": password
    }

    let mongoFindUser = await mongoConnections.userLogin(req, res, next, userCredentials)

    if (!mongoFindUser) {
        return next({message: "Invalid Credentials"})                  //post request cut short -------------
    }

    let isValidPassword = await bcrypt.compare(password, mongoFindUser.password)

    if (!isValidPassword) {
        return next({message: "Invalid Password"})                     // post request cut short ----------------
    }

    let token = jwt.sign({userId: mongoFindUser._id.toString(), username: mongoFindUser.username}, jwtSecret)

    res.status(201).json({userId: mongoFindUser._id.toString(), username: mongoFindUser.username, token: token})
}

exports.userSignup = userSignup
exports.userLoginMain = userLoginMain