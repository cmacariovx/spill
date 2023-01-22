const mongoConnections = require('../mongo')
require("dotenv").config()

const jwtSecret = process.env.JWT_SECRET

async function createPost(req, res, next) {
    const { userId, mainText, timePosted, likeCount, comments } = req.body

    const postData = {
        userId: userId,
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

exports.createPost = createPost
exports.searchUsers = searchUsers