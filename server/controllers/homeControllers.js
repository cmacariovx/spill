const mongoConnections = require('../mongo')
require("dotenv").config()

const jwtSecret = process.env.JWT_SECRET

async function createPost(req, res, next) {
    const { userId, creatorUsername, mainText, timePosted, likeCount, comments } = req.body

    const postData = {
        userId: userId,
        creatorUsername: creatorUsername,
        mainText: mainText,
        timePosted: timePosted,
        likeCount: 0,
        comments: []
    }

    let mongoCreatePost = await mongoConnections.createPostMongo(req, res, next, postData)
}

async function searchUsers(req, res, next) {
    const { searchTerm } = req.body

    const searchData = {
        searchTerm: searchTerm
    }

    if (!searchTerm) return null
    let mongoSearchUsers = await mongoConnections.searchUsersMongo(req, res, next, searchData)
    res.json(mongoSearchUsers)
}

async function followUser(req, res, next) {
    const { loggedInUserId, loggedInUsername, followedUserId, followedUsername } = req.body

    let usersData = {
        loggedInUserId: loggedInUserId,
        loggedInUsername: loggedInUsername,
        followedUserId: followedUserId,
        followedUsername: followedUsername
    }

    let mongoAddFollower = await mongoConnections.addFollowerMongo(req, res, next, usersData)
}

async function unfollowUser(req, res, next) {
    const { loggedInUserId, loggedInUsername, followedUserId, followedUsername } = req.body

    let usersData = {
        loggedInUserId: loggedInUserId,
        loggedInUsername: loggedInUsername,
        followedUserId: followedUserId,
        followedUsername: followedUsername
    }

    let mongoRemoveFollower = await mongoConnections.removeFollowerMongo(req, res, next, usersData)
}

async function fetchPosts(req, res, next) {
    const { followingArr, loggedInUsername } = req.body

    let followingData = {
        followingArr: followingArr
    }

    let mongoFetchPosts = await mongoConnections.fetchPostsMongo(req, res, next, followingData, loggedInUsername)
}

exports.createPost = createPost
exports.searchUsers = searchUsers
exports.followUser = followUser
exports.unfollowUser = unfollowUser
exports.fetchPosts = fetchPosts
