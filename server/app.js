const express = require("express")
const bodyParser = require("body-parser")

const mainRouter = require('./routes/mainRoutes')

const app = express()

app.use("/", mainRouter)

app.listen(5000)