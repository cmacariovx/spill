const { ObjectID } = require("bson")

const MongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId
require("dotenv").config()

const mongoUrl = process.env.MONGO_URL

async function userSignup (req, res, next, newUser) {
    const client = new MongoClient(mongoUrl)
    let result
    let existingUser
    try {
        await client.connect()
        const db = client.db()
        existingUser = await db.collection("users").findOne({"username": newUser.username})

        if (existingUser) {
            client.close()
            return JSON.stringify({message: "Username already exists"})             // Return an error modal
        }

        result = await db.collection("users").insertOne(newUser)
    }
    catch (error) {
        return res.json({"message": "Could not add user"})
    }

    client.close()
}

async function userLogin (req, res, next, userCredentials) {
    const client = new MongoClient(mongoUrl)
    let user
    try {
        await client.connect()
        const db = client.db()
        user = await db.collection("users").findOne({"username": userCredentials.username})
    }
    catch (error) {
        return res.json({"message": "Could not find user"})
    }

    client.close()
    return user
}

async function createPostMongo(req, res, next, postData) {
    const client = new MongoClient(mongoUrl)
    let response1
    let response2
    try {
        await client.connect()
        const db = client.db()
        response1 = await db.collection("posts").insertOne({
            'userId': postData.userId,
            'creatorUsername': postData.creatorUsername,
            'mainText': postData.mainText,
            'timePosted': postData.timePosted,
            'likes': [],
            'likeCount': 0,
            'comments': [],
            'commentCount': 0,
            'creatorVerified': postData.creatorVerified
        })

        response2 = await db.collection("users").updateOne({"username": postData.creatorUsername},
        {
            $push: {
                posts: {
                    postId: response1.insertedId
                }
            },
            $inc: {
                postsNum: 1
            }
        })

    }
    catch(error) {
        return res.json({"message": "Could not create post"})
    }

    client.close()
    res.json({response1: response1, response2: response2})
}

async function searchUsersMongo(req, res, next) {
    const client = new MongoClient(mongoUrl)
    await client.connect()

    let response

    try {
        const db = client.db()
        let collection = db.collection("users")

        const cursor = collection.find()

        response = await cursor.toArray()
    }
    finally {
        await client.close()
    }

    res.json(response)
}

async function fetchUserProfileMongo(req, res, next, username) {
    const client = new MongoClient(mongoUrl)

    await client.connect()
    const db = client.db()
    let response = await db.collection("users").findOne({"username": username})

    client.close()
    res.json(response)
}

async function addFollowerMongo(req, res, next, usersData) {
    const { loggedInUserId, loggedInUsername, followedUserId, followedUsername } = usersData

    const client = new MongoClient(mongoUrl)

    await client.connect()
    const db = client.db()

    // update logged in user's following list
    let response1 = await db.collection("users").updateOne({"username": loggedInUsername},
        {
            $push: {
                following: {
                    followedUserId: followedUserId,
                    followedUsername: followedUsername
                }
            },
            $inc: {
                followingNum: 1
            }
        }
    )

    // update followed user's followers list
    let response2 = await db.collection("users").updateOne({"username": followedUsername},
        {
            $push: {
                followers: {
                    loggedInUserId: loggedInUserId,
                    loggedInUsername: loggedInUsername
                }
            },
            $inc: {
                followersNum: 1
            }
        }
    )

    client.close()
    res.json({response1: response1, response2: response2})
}

async function removeFollowerMongo(req, res, next, usersData) {
    const { loggedInUserId, loggedInUsername, followedUserId, followedUsername } = usersData

    const client = new MongoClient(mongoUrl)

    await client.connect()
    const db = client.db()

    // update logged in user's following list
    let response1 = await db.collection("users").updateOne({"username": loggedInUsername},
        {
            $pull: {
                following: {
                    followedUserId: followedUserId,
                    followedUsername: followedUsername
                }
            },
            $inc: {
                followingNum: -1
            }
        }
    )

    // update followed user's followers list
    let response2 = await db.collection("users").updateOne({"username": followedUsername},
        {
            $pull: {
                followers: {
                    loggedInUserId: loggedInUserId,
                    loggedInUsername: loggedInUsername
                }
            },
            $inc: {
                followersNum: -1
            }
        }
    )

    client.close()
    res.json({response1: response1, response2: response2})
}

async function fetchPostsMongo(req, res, next, followingData, loggedInUsername) {
    const { followingArr } = followingData

    let following = []
    followingArr.forEach((user) => following.push(user.followedUsername))

    const client = new MongoClient(mongoUrl)
    await client.connect()

    let findAllResponse
    let findOneResponse

    try {
        const db = client.db()
        let collection = db.collection("posts")
        let query = {creatorUsername: {$in: [...following]}}

        const cursor = collection.find(query).sort({_id: -1}).limit(20)

        findAllResponse = await cursor.toArray()

        const cursor2 = db.collection("posts").find({"creatorUsername": loggedInUsername}).sort({_id: -1}).limit(1)

        findOneResponse = await cursor2.toArray()
    }
    finally {
        await client.close()
    }

    res.json({findOneResponse: findOneResponse, findAllResponse: findAllResponse})
}

async function fetchCommentsMongo(req, res, next, postId) {
    const client = new MongoClient(mongoUrl)
    await client.connect()

    let response

    try {
        const db = client.db()
        let collection = db.collection("comments")
        let query = {postId: postId}

        const cursor = collection.find(query).sort({_id: -1}).limit(20)

        response = await cursor.toArray()
    }
    finally {
        await client.close()
    }

    res.json(response)
}

async function createCommentMongo(req, res, next, commentData) {
    const client = new MongoClient(mongoUrl)

    let response1
    let response2

    try {
        await client.connect()
        const db = client.db()
        response1 = await db.collection("comments").insertOne({
            postId: commentData.postId,
            postCreatorId: commentData.postCreatorId,
            postCreatorUsername: commentData.postCreatorUsername,
            commentUserId: commentData.commentUserId,
            commentUsername: commentData.commentUsername,
            commentBodyText: commentData.commentBodyText,
            commentTimePosted: commentData.commentTimePosted,
            creatorVerified: commentData.creatorVerified
        })
        response2 = await db.collection("posts").updateOne({_id: new ObjectId(commentData.postId)}, {
            $push: {
                comments: {
                    commentId: response1.insertedId
                }
            },
            $inc: {
                commentCount: 1
            }
        })
    }
    catch(error) {
        return res.json({"message": "Could not create comment"})
    }

    client.close()
    res.json({response1, response2})
}

async function fetchProfilePostsMongo(req, res, next, profileUsername) {
    const client = new MongoClient(mongoUrl)
    await client.connect()

    let response

    try {
        const db = client.db()
        let collection = db.collection("posts")
        let query = {creatorUsername: profileUsername}

        const cursor = collection.find(query).sort({_id: -1}).limit(20)

        response = await cursor.toArray()
    }
    finally {
        await client.close()
    }

    res.json(response)
}

async function likePostMongo(req, res, next, data) {
    const client = new MongoClient(mongoUrl)
    client.connect()

    const db = client.db()
    let response1 = await db.collection("posts").updateOne({_id: new ObjectId(data.postId)}, {
        $push: {
            likes: {
                postId: data.postId,
                loggedInUserId: data.loggedInUserId,
                loggedInUsername: data.loggedInUsername,
            }
        },
        $inc: {
            likeCount: 1
        }
    })

    let response2 = await db.collection("users").updateOne({_id: new ObjectId(data.loggedInUserId)}, {
        $push: {
            likedPosts: {
                postId: data.postId
            }
        }
    })

    client.close()
    res.json({response1: response1, response2: response2})
}

async function unlikePostMongo(req, res, next, data) {
    const client = new MongoClient(mongoUrl)
    client.connect()

    const db = client.db()
    let response1 = await db.collection("posts").updateOne({_id: new ObjectId(data.postId)}, {
        $pull: {
            likes: {
                postId: data.postId,
                loggedInUserId: data.loggedInUserId,
                loggedInUsername: data.loggedInUsername,
            }
        },
        $inc: {
            likeCount: -1
        }
    })

    let response2 = await db.collection("users").updateOne({_id: new ObjectId(data.loggedInUserId)}, {
        $pull: {
            likedPosts: {
                postId: data.postId
            }
        }
    })

    client.close()
    res.json({response1: response1, response2: response2})
}

async function deletePostMongo(req, res, next, userId, postId) {
    const client = new MongoClient(mongoUrl)
    client.connect()

    let response1
    let response2

    try {
        const db = client.db()

        response1 = await db.collection("posts").deleteOne({_id: new ObjectId(postId)})
        response2 = await db.collection("users").updateOne({_id: new ObjectId(userId)}, {
            $pull: {
                posts: {
                    postId: new ObjectId(postId),
                }
            },
            $inc: {
                postsNum: -1
            }
        })


    }
    finally {
        client.close()
    }

    res.json({response1: response1, response2: response2})
}

async function deleteCommentMongo(req, res, next, userId, postId, commentId) {
    const client = new MongoClient(mongoUrl)
    client.connect()

    let response1
    let response2

    try {
        const db = client.db()

        response1 = await db.collection("posts").updateOne({_id: new ObjectId(postId)},
        {
            $pull: {
                comments: {
                    commentId: new ObjectId(commentId),
                }
            },
            $inc: {
                commentCount: -1
            }
        })
        response2 = await db.collection("comments").deleteOne({_id: new ObjectId(commentId)})
    }
    finally {
        client.close()
    }

    res.json({response1, response2})
}

async function fetchLikedPostsMongo(req, res, next, profileUsername, likedPosts) {
    const client = new MongoClient(mongoUrl)
    await client.connect()

    let likedPostsArr = []
    likedPosts.forEach(obj => {
        likedPostsArr.push(new ObjectId(obj.postId))
    })

    let response

    try {
        const db = client.db()
        let collection = db.collection("posts")

        const cursor = collection.find({_id: { $in: likedPostsArr }}).sort({_id: -1}).limit(20)

        response = await cursor.toArray()
    }
    finally {
        await client.close()
    }

    res.json(response)
}

async function likedPostsPrivateMongo(req, res, next, userId) {
    const client = new MongoClient(mongoUrl)

    await client.connect()
    const db = client.db()
    let response = await db.collection("users").updateOne({_id: new ObjectId(userId)}, { $set: {privateLikedPosts: true} })

    client.close()
    res.json(response)
}

async function likedPostsPublicMongo(req, res, next, userId) {
    const client = new MongoClient(mongoUrl)

    await client.connect()
    const db = client.db()
    let response = await db.collection("users").updateOne({_id: new ObjectId(userId)}, { $set: {privateLikedPosts: false} })

    client.close()
    res.json(response)
}

async function fetchSettingsMongo(req, res, next, userId) {
    const client = new MongoClient(mongoUrl)

    await client.connect()
    const db = client.db()
    let response = await db.collection("users").findOne({_id: new ObjectId(userId)})

    client.close()
    res.json(response)
}

async function createConversationMongo(req, res, next, data) {
    const client = new MongoClient(mongoUrl)

    await client.connect()
    const db = client.db()
    let response = await db.collection("conversations").insertOne({
        createdUserId: data.userId,
        createdUsername: data.createdUsername,
        receivingUserId: data.receivingUserId,
        receivingUsername: data.receivingUsername,
        messages: [], // {userId, messageText, timeSent}
        timeCreated: Date.now(),
        timeLastMessageSent: 0.0,
        latestMessageSent: {}
    })

    client.close()
    res.json(response)
}

async function fetchAllConversationsMongo(req, res, next, userId) {
    const client = new MongoClient(mongoUrl)
    await client.connect()

    let response

    try {
        const db = client.db()
        let collection = db.collection("conversations")

        // or receiving end
        const cursor = collection.find({ $or: [{createdUserId: userId}, {receivingUserId: userId}] }).sort({timeLastMessageSent: -1})

        let arr = []
        await cursor.forEach((conversation) => {
            conversation.messages.reverse()
            arr.push(conversation)
        })
        response = arr
    }
    finally {
        await client.close()
    }

    res.json(response)
}

async function createMessageMongo(req, res, next, data) {
    const client = new MongoClient(mongoUrl)

    await client.connect()
    const db = client.db()
    let response = await db.collection("conversations").updateOne({_id: new ObjectId(data.conversationId)}, {
        $push: {
            messages: {
                createdUserId: data.createdUserId,
                createdUsername: data.createdUsername,
                messageText: data.messageText,
                timeCreated: data.timeCreated
            }
        },
        $set: {
            timeLastMessageSent: data.timeCreated,
            latestMessageSent: {
                createdUserId: data.createdUserId,
                createdUsername: data.createdUsername,
                messageText: data.messageText,
                timeCreated: data.timeCreated,
                messageOpened: false
            }
        }
    })

    client.close()
    res.json(response)
}

async function fetchConvoMongo(req, res, next, conversationId) {
    const client = new MongoClient(mongoUrl)

    await client.connect()
    const db = client.db()
    let response = await db.collection("conversations").findOne({_id: new ObjectId(conversationId)})
    // response.messages.reverse()

    client.close()
    res.json(response)
}

async function readMessageMongo(req, res, next, conversationId) {
    const client = new MongoClient(mongoUrl)

    await client.connect()
    const db = client.db()
    let response = await db.collection("conversations").updateOne({_id: new ObjectId(conversationId)}, { $set: {"latestMessageSent.messageOpened": true} })

    client.close()
    res.json(response)
}

exports.userSignup = userSignup
exports.userLogin = userLogin
exports.createPostMongo = createPostMongo
exports.searchUsersMongo = searchUsersMongo
exports.fetchUserProfileMongo = fetchUserProfileMongo
exports.addFollowerMongo = addFollowerMongo
exports.removeFollowerMongo = removeFollowerMongo
exports.fetchPostsMongo = fetchPostsMongo
exports.fetchCommentsMongo = fetchCommentsMongo
exports.createCommentMongo = createCommentMongo
exports.fetchProfilePostsMongo = fetchProfilePostsMongo
exports.likePostMongo = likePostMongo
exports.unlikePostMongo = unlikePostMongo
exports.deletePostMongo = deletePostMongo
exports.deleteCommentMongo = deleteCommentMongo
exports.fetchLikedPostsMongo = fetchLikedPostsMongo
exports.likedPostsPrivateMongo = likedPostsPrivateMongo
exports.likedPostsPublicMongo = likedPostsPublicMongo
exports.fetchSettingsMongo = fetchSettingsMongo
exports.createConversationMongo = createConversationMongo
exports.fetchAllConversationsMongo = fetchAllConversationsMongo
exports.createMessageMongo = createMessageMongo
exports.fetchConvoMongo = fetchConvoMongo
exports.readMessageMongo = readMessageMongo
