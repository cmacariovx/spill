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

async function fetchLikedPosts(req, res, next) {
    const { profileUsername, likedPosts } = req.body

    let mongoLikedFetchPosts = await mongoConnections.fetchLikedPostsMongo(req, res, next, profileUsername, likedPosts)
}

async function likedPostsPrivate(req, res, next) {
    const { userId } = req.body

    let mongoLikedPostsPrivate = await mongoConnections.likedPostsPrivateMongo(req, res, next, userId)
}

async function likedPostsPublic(req, res, next) {
    const { userId } = req.body

    let mongoLikedPostsPublic = await mongoConnections.likedPostsPublicMongo(req, res, next, userId)
}

async function fetchSettings(req, res, next) {
    const { userId } = req.body

    let mongoFetchSettings = await mongoConnections.fetchSettingsMongo(req, res, next, userId)
}

exports.fetchUserProfile = fetchUserProfile
exports.fetchProfilePosts = fetchProfilePosts
exports.fetchLikedPosts = fetchLikedPosts
exports.likedPostsPrivate = likedPostsPrivate
exports.likedPostsPublic = likedPostsPublic
exports.fetchSettings = fetchSettings
