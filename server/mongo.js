const MongoClient = require("mongodb").MongoClient
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
    let response
    try {
        await client.connect()
        const db = client.db()
        response = await db.collection("posts").insertOne({
            'userId': postData.userId,
            'creatorUser': postData.creatorUsername,
            'mainText': postData.mainText,
            'timePosted': postData.timePosted,
            'likeCount': 0,
            'comments': []
        })
    }
    catch(error) {
        return res.json({"message": "Could not create post"})
    }

    client.close()
    res.json(response)
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
    console.log(response)
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
            }
        }
    )

    client.close()
    res.json({response1: response1, response2: response2})
}

exports.userSignup = userSignup
exports.userLogin = userLogin
exports.createPostMongo = createPostMongo
exports.searchUsersMongo = searchUsersMongo
exports.fetchUserProfileMongo = fetchUserProfileMongo
exports.addFollowerMongo = addFollowerMongo
