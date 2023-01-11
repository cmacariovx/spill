const express = require("express")
const bodyParser = require("body-parser")
const mongoPractice = require("./mongo")

const mainRouter = require('./routes/mainRoutes')

const app = express()

// app.use("/", mainRouter)
app.use(bodyParser.json())

app.post("/users", mongoPractice.mainFetch)

app.get("/users", mongoPractice.mainGet)

app.listen(5000)