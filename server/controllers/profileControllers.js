const mongoConnections = require('../mongo')
require("dotenv").config()

async function fetchUserProfile(req, res, next) {
    const { profileUsername } = req.body
    if (!profileUsername) return null

    let mongoFetchUserProfile = await mongoConnections.fetchUserProfileMongo(req, res, next, profileUsername)
}

async function fetchProfilePosts(req, res, next) {
    const { profileUsername } = req.body

    let mongoProfileFetchPosts = await mongoConnections.fetchProfilePostsMongo(req, res, next, profileUsername)
}

exports.fetchUserProfile = fetchUserProfile
exports.fetchProfilePosts = fetchProfilePosts
