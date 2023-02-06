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
        likes: [],
        likeCount: 0,
        comments: [],
        commentCount: 0
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

async function createComment(req, res, next) {
    const { postId, postCreatorId, postCreatorUsername, commentUserId, commentUsername, commentBodyText, commentTimePosted } = req.body

    const commentData = {
        postId: postId,
        postCreatorId: postCreatorId,
        postCreatorUsername: postCreatorUsername,
        commentUserId: commentUserId,
        commentUsername: commentUsername,
        commentBodyText: commentBodyText,
        commentTimePosted: commentTimePosted
    }

    let mongoCreateComment = await mongoConnections.createCommentMongo(req, res, next, commentData)
}

async function likePost(req, res, next) {
    const { loggedInUserId, loggedInUsername, postId } = req.body

    let mongoLikePost = await mongoConnections.likePostMongo(req, res, next, req.body)
}

async function unlikePost(req, res, next) {
    const { loggedInUserId, loggedInUsername, postId } = req.body

    let mongoUnlikePost = await mongoConnections.unlikePostMongo(req, res, next, req.body)
}

async function deletePost(req, res, next) {
    const { userId, postId } = req.body

    let mongoDeletePost = await mongoConnections.deletePostMongo(req, res, next, userId, postId)
}


exports.createPost = createPost
exports.searchUsers = searchUsers
exports.followUser = followUser
exports.unfollowUser = unfollowUser
exports.fetchPosts = fetchPosts
exports.createComment = createComment
exports.likePost = likePost
exports.unlikePost = unlikePost
exports.deletePost = deletePost
