const express = require("express")
const bodyParser = require("body-parser")
const mongoPractice = require("./mongo")

const mainRouter = require('./routes/mainRoutes')

const app = express()

// app.use("/", mainRouter)

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

    next()
})

app.post("/users", mongoPractice.mainFetch)

app.get("/users", mongoPractice.mainGet)

app.use((req, res, next) => {
    const error = new Error("Could not find this route.")
    throw error
})

app.use((error, req, res, next) => {
    if (res.headerSent) return next(error)

    res.status(error.code || 500)
    res.json({"message": error.message || "Unknown error occured."})
})
app.listen(5000)