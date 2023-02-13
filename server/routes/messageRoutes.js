const express = require("express")
const messageControllers = require('../controllers/messageControllers')

const checkAuth = require("../middleware/check-auth")

const router = express.Router()

router.use(checkAuth)

router.post('/createConversation', messageControllers.createConversation)

router.post('/fetchAllConversations', messageControllers.fetchAllConversations)

router.post('/createMessage', messageControllers.createMessage)

router.post('/fetchConvo', messageControllers.fetchConvo)

module.exports = router
