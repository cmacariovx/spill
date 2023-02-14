const express = require("express")
const bodyParser = require("body-parser")
const http = require("http") // socketio only supports http servers for now
const { Server } = require('socket.io')
const cors = require('cors')
const path = require('path')

const authRouter = require('./routes/authRoutes')
const homeRouter = require('./routes/homeRoutes')
const profileRouter = require('./routes/profileRoutes')
const messageRouter = require('./routes/messageRoutes')

const app = express()

app.listen(5000)

app.use(bodyParser.json())

app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

    next()
})

app.use("/auth", authRouter)

app.use("/home", homeRouter)

app.use("/profile", profileRouter)

app.use("/message", messageRouter)

app.use((req, res, next) => {
    const error = new Error("Could not find this route.")
    throw error
})

app.use((error, req, res, next) => {
    if (res.headerSent) return next(error)

    res.status(error.code || 500)
    res.json({"message": error.message || "Unknown error occured."})
})

// socket io -------------------------------------------------------------------------------------

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        headers: ["Content-Type", "Authorization", "Origin", "X-Requested-With", "Accept"],
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.removeAllListeners()
    socket.on("joinConversation", (data) => {
        socket.join(data)
    })
    socket.on("leaveConversation", (data) => {
        socket.leave(data)
        socket.removeAllListeners()
    })
    socket.on("sendMessage", (data) => {
        socket.to(data.conversationId).emit("showMessage", data)
    })
})

server.listen(5001)
