const mongoConnections = require('../mongo')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()

const jwtSecret = process.env.JWT_SECRET

async function userSignup (req, res, next) {
    const { username, fullName, email, password } = req.body

    // replacement for flawed js regex engine ------------- virtually zero effect on performance given O(username|fullName.length) time
    if (username.trim().length < 3) return res.json({message: 'Invalid input data.'})
    if (fullName.trim().length === 0) return res.json({message: 'Invalid input data.'})
    if (email.trim().length === 0) return res.json({message: 'Invalid input data.'})
    if (password.trim().length < 6) return res.json({message: 'Invalid input data.'})

    let allowedChars = {'a': true, 'b': true, 'c': true, 'd': true, 'e': true, 'f': true, 'g': true, 'h': true, 'i': true, 'j': true, 'k': true, 'l': true, 'm': true, 'n': true, 'o': true, 'p': true, 'q': true, 'r': true, 's': true, 't': true, 'u': true, 'v': true, 'w': true, 'x': true, 'y': true, 'z': true, ' ': true}

    for (let i = 0; i < username.length; i++) {
        if (username[i] === ' ') return res.json({message: 'Invalid input data.'})
        else if (allowedChars[username[i]] !== true) return res.json({message: 'Invalid input data.'})
    }

    for (let i = 0; i < fullName.length; i++) {
        if (allowedChars[fullName[i].toLowerCase()] !== true) return res.json({message: 'Invalid input data.'})
    }
    // -----------------------

    let hashedPassword = await bcrypt.hash(password, 12)

    const createdUser = {
        'username': username.toLowerCase(),
        'fullName': fullName,
        'email': email,
        'password': hashedPassword, // add profile pic link
        'followers': [],
        'followersNum': 0,
        'following': [],
        'followingNum': 0,
        'posts': [],
        'postsNum': 0,
        'verified': false,
        'likedPosts': [],
        'privateLikedPosts': false,
        'profilePicture': req.file.path
    }

    let mongoConnect = await mongoConnections.userSignup(req, res, next, createdUser)
    let mongoJson
    if (mongoConnect) mongoJson = JSON.parse(mongoConnect)

    // if username exists, message is thrown and caught here, return to end before login function
    if (mongoJson) {
        return res.status(409).json(mongoJson)
    }

    let loginUserData = {
        username: createdUser.username,
        password: createdUser.password
    }

    let loginUser = await userLoginMain(req, res, next, loginUserData)
}

async function userLoginMain (req, res, next, signup = null) {
    const { username, password } = req.body || signup

    let userCredentials = {
        "username": username.toLowerCase(),
        "password": password
    }

    let mongoFindUser = await mongoConnections.userLogin(req, res, next, userCredentials)

    if (!mongoFindUser) {
        return res.status(401).json({message: "Invalid Credentials"})   //post request cut short -------------
    }

    let isValidPassword = await bcrypt.compare(password, mongoFindUser.password)

    if (!isValidPassword) {
        return res.status(401).json({message: "Invalid Password"})      // post request cut short ----------------
    }

    let token = jwt.sign({userId: mongoFindUser._id.toString(), username: mongoFindUser.username}, jwtSecret)

    res.status(201).json({userId: mongoFindUser._id.toString(), username: mongoFindUser.username, token: token, following: mongoFindUser.following, verified: mongoFindUser.verified, profilePicture: mongoFindUser.profilePicture})
}

exports.userSignup = userSignup
exports.userLoginMain = userLoginMain
