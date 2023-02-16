const mongoConnections = require('../mongo')
require("dotenv").config()

const jwtSecret = process.env.JWT_SECRET

async function createPost(req, res, next) {
    const { userId, creatorUsername, mainText, timePosted, likeCount, comments, creatorVerified, creatorProfilePicture } = req.body

    const postData = {
        userId: userId,
        creatorUsername: creatorUsername,
        mainText: mainText,
        timePosted: timePosted,
        likes: [],
        likeCount: 0,
        comments: [],
        commentCount: 0,
        creatorVerified: creatorVerified,
        creatorProfilePicture: creatorProfilePicture
    }

    let mongoCreatePost = await mongoConnections.createPostMongo(req, res, next, postData)
}

async function searchUsers(req, res, next) {
    let mongoSearchUsers = await mongoConnections.searchUsersMongo(req, res, next)
}

async function followUser(req, res, next) {
    const { loggedInUserId, loggedInUsername, followedUserId, followedUsername, loggedInUserProfilePicture, loggedInUserVerified, followedUserProfilePicture, followedUserVerified } = req.body

    let usersData = {
        loggedInUserId: loggedInUserId,
        loggedInUsername: loggedInUsername,
        followedUserId: followedUserId,
        followedUsername: followedUsername,
        loggedInUserProfilePicture: loggedInUserProfilePicture,
        loggedInUserVerified: loggedInUserVerified,
        followedUserProfilePicture: followedUserProfilePicture,
        followedUserVerified: followedUserVerified
    }

    let mongoAddFollower = await mongoConnections.addFollowerMongo(req, res, next, usersData)
}

async function unfollowUser(req, res, next) {
    const { loggedInUserId, loggedInUsername, followedUserId, followedUsername, loggedInUserProfilePicture, loggedInUserVerified, followedUserProfilePicture, followedUserVerified } = req.body

    let usersData = {
        loggedInUserId: loggedInUserId,
        loggedInUsername: loggedInUsername,
        followedUserId: followedUserId,
        followedUsername: followedUsername,
        loggedInUserProfilePicture: loggedInUserProfilePicture,
        loggedInUserVerified: loggedInUserVerified,
        followedUserProfilePicture: followedUserProfilePicture,
        followedUserVerified: followedUserVerified
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

async function fetchComments(req, res, next) {
    const { postId } = req.body

    let mongoFetchComments = await mongoConnections.fetchCommentsMongo(req, res, next, postId)
}

async function createComment(req, res, next) {
    const { postId, postCreatorId, postCreatorUsername, commentUserId, commentUsername, commentBodyText, commentTimePosted, creatorVerified, creatorProfilePicture } = req.body

    const commentData = {
        postId: postId,
        postCreatorId: postCreatorId,
        postCreatorUsername: postCreatorUsername,
        commentUserId: commentUserId,
        commentUsername: commentUsername,
        commentBodyText: commentBodyText,
        commentTimePosted: commentTimePosted,
        creatorVerified: creatorVerified,
        creatorProfilePicture: creatorProfilePicture
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

async function deleteComment(req, res, next) {
    const { userId, postId, commentId } = req.body

    let mongoDeleteComment = await mongoConnections.deleteCommentMongo(req, res, next, userId, postId, commentId)
}


exports.createPost = createPost
exports.searchUsers = searchUsers
exports.followUser = followUser
exports.unfollowUser = unfollowUser
exports.fetchPosts = fetchPosts
exports.fetchComments = fetchComments
exports.createComment = createComment
exports.likePost = likePost
exports.unlikePost = unlikePost
exports.deletePost = deletePost
exports.deleteComment = deleteComment
