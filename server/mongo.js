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
            return next({message: "Username already exists"})              // Return an error modal
        }

        result = await db.collection("users").insertOne(newUser)
    }
    catch (error) {
        return res.json({"message": "Could not add user"})
    }

    client.close()
    // res.json(result)
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
    // res.json(user) // Sending headers early
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
            'commentCount': 0
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

async function searchUsersMongo(req, res, next, searchData) {
    const client = new MongoClient(mongoUrl)
    let response = await client.db("test").collection("users").aggregate([
        {
            $search: {
                index: "default",
                compound: {
                    must: [
                        {
                            text: {
                                query: searchData.searchTerm,
                                path: "usernameSpread",
                                fuzzy: {
                                    maxEdits: 1,
                                }
                            }
                        }
                    ]
                }
            }
        },
        {
            $limit: 10
        },
        {
            $project: {
                _id: 1,
                username: 1,
                usernameSpread: 1,
                fullName: 1,
                email: 1,
                password: 1,
                followers: 1,
                following: 1,
                verified: 1,
                interactedPosts: 1,
                score: { $meta: "searchScore" }
            }
        }

    ]).toArray()

    return response
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

async function createCommentMongo(req, res, next, commentData) {
    const client = new MongoClient(mongoUrl)

    let response
    try {
        await client.connect()
        const db = client.db()
        response = await db.collection("posts").updateOne({_id: new ObjectId(commentData.postId)}, {
            $push: {
                comments: {
                    postId: commentData.postId,
                    postCreatorId: commentData.postCreatorId,
                    postCreatorUsername: commentData.postCreatorUsername,
                    commentUserId: commentData.commentUserId,
                    commentUsername: commentData.commentUsername,
                    commentBodyText: commentData.commentBodyText,
                    commentTimePosted: commentData.commentTimePosted
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
    res.json(response)
}

async function fetchPersonalPostsMongo(req, res, next, personalData) {
    const { loggedInUserId, loggedInUsername } = personalData

    const client = new MongoClient(mongoUrl)
    await client.connect()

    let response

    try {
        const db = client.db()
        let collection = db.collection("posts")
        let query = {creatorUsername: loggedInUsername}

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
            interactedPosts: {
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
            interactedPosts: {
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


exports.userSignup = userSignup
exports.userLogin = userLogin
exports.createPostMongo = createPostMongo
exports.searchUsersMongo = searchUsersMongo
exports.fetchUserProfileMongo = fetchUserProfileMongo
exports.addFollowerMongo = addFollowerMongo
exports.removeFollowerMongo = removeFollowerMongo
exports.fetchPostsMongo = fetchPostsMongo
exports.createCommentMongo = createCommentMongo
exports.fetchPersonalPostsMongo = fetchPersonalPostsMongo
exports.likePostMongo = likePostMongo
exports.unlikePostMongo = unlikePostMongo
exports.deletePostMongo = deletePostMongo
