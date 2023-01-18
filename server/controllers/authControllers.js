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
    console.log(mongoConnect)
}

async function userLoginMain (req, res, next) {
    const { username, password } = req.body     // post request after options successfully sends payload

    let userCredentials = {
        "username": username,
        "password": password
    }

    let mongoFindUser = await mongoConnections.userLogin(req, res, next, userCredentials)

    if (!mongoFindUser) {
        console.log("User not found")
        // res.status(401).json({message: "Authorization failed"}) // adding this allows access even with wrong credentials
        return null                    //post request cut short -------------
    }

    console.log(mongoFindUser)

    let isValidPassword = await bcrypt.compare(password, mongoFindUser.password)

    if (!isValidPassword) {
        console.log("Invalid Credentials")
        // res.status(401).json({message: "Authorization failed"}) // adding this allows access even with wrong credentials
        return null                     // post request cut short ----------------
    }
    
    console.log("Success") // Logic for logging in user

    let token = jwt.sign({userId: mongoFindUser._id.toString(), username: mongoFindUser.username}, jwtSecret)

    res.status(201).json({userId: mongoFindUser._id.toString(), username: mongoFindUser.username, token: token})
}

exports.userSignup = userSignup
exports.userLoginMain = userLoginMain