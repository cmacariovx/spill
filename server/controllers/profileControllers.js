const mongoConnections = require('../mongo')
require("dotenv").config()

async function fetchUserProfile(req, res, next) {
    const { profileUsername } = req.body
    if (!profileUsername) return null

    let mongoFetchUserProfile = await mongoConnections.fetchUserProfileMongo(req, res, next, profileUsername)
}

async function fetchPersonalPosts(req, res, next) {
    const { loggedInUserId, loggedInUsername } = req.body

    let personalData = {
        loggedInUserId: loggedInUserId,
        loggedInUsername: loggedInUsername
    }

    let mongoPersonalFetchPosts = await mongoConnections.fetchPersonalPostsMongo(req, res, next, personalData)
}

exports.fetchUserProfile = fetchUserProfile
exports.fetchPersonalPosts = fetchPersonalPosts
