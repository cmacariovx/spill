const MongoClient = require("mongodb").MongoClient

const mongoUrl = "mongodb+srv://cmacariovx:ZDW5TyX1jvCT7RNB@cluster0.2b2mmoz.mongodb.net/?retryWrites=true&w=majority"

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
        return res.json({"message": "Could not store data."})
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
        return res.json({"message": "Could not get users."})
    }

    client.close()
    res.json(users)
}

exports.mainFetch = mainFetch
exports.mainGet = mainGet