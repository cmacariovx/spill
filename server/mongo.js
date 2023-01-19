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

exports.userSignup = userSignup
exports.userLogin = userLogin
exports.createPostMongo = createPostMongo
