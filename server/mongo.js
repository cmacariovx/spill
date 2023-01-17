const MongoClient = require("mongodb").MongoClient
require("dotenv").config()

const mongoUrl = process.env.MONGO_URL

const mainFetch = async (req, res, next) => {
    const newUser = {
        username: req.body.username
    }

    const client = new MongoClient(mongoUrl)

    try {
        await client.connect()
        const db = client.db()
        const result = await db.collection("users").insertOne(newUser)
    } catch (error) {
        return res.json({"message": "Could not store data"})
    }

    client.close()
    res.json(newUser)
}

const mainGet = async (req, res, next) => {
    const client = new MongoClient(mongoUrl)
    let users

    try {
        await client.connect()
        const db = client.db()
        users = await db.collection("users").find().toArray()
    }
    catch (error) {
        return res.json({"message": "Could not fetch users"})
    }

    client.close()
    res.json(users)
}

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
            console.log(existingUser)
            res.json(existingUser)
            return null              // Return an error modal
        }

        result = await db.collection("users").insertOne(newUser)
    }
    catch (error) {
        return res.json({"message": "Could not add user"})
    }

    client.close()
    res.json(result)
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
    res.json(user)
    return user
}

exports.mainFetch = mainFetch
exports.mainGet = mainGet
exports.userSignup = userSignup
exports.userLogin = userLogin
