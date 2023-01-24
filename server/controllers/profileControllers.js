const mongoConnections = require('../mongo')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()

const jwtSecret = process.env.JWT_SECRET

async function fetchUserProfile(req, res, next) {
    const { profileUsername } = req.body
    if (!profileUsername) return null
    let mongoFetchUserProfile = await mongoConnections.fetchUserProfileMongo(req, res, next, profileUsername)
    console.log(mongoFetchUserProfile)
}

exports.fetchUserProfile = fetchUserProfile