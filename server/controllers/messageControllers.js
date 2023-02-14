const mongoConnections = require('../mongo')
require("dotenv").config()

function createConversation(req, res, next) {
    const { userId, createdUsername, receivingUserId, receivingUsername } = req.body

    let data = {
        userId,
        createdUsername,
        receivingUserId,
        receivingUsername
    }

    const mongoCreateConversation = mongoConnections.createConversationMongo(req, res, next, data)
}

function fetchAllConversations(req, res, next) {
    const { userId } = req.body

    const mongoFetchAllConversations = mongoConnections.fetchAllConversationsMongo(req, res, next, userId)
}

function createMessage(req, res, next) {
    const { conversationId, createdUserId, createdUsername, messageText, timeCreated } = req.body

    const data = {
        conversationId,
        createdUserId,
        createdUsername,
        messageText,
        timeCreated
    }

    const mongoCreateMessage = mongoConnections.createMessageMongo(req, res, next, data)
}

function fetchConvo(req, res, next) {
    const { conversationId } = req.body

    const mongoFetchConvo = mongoConnections.fetchConvoMongo(req, res, next, conversationId)
}

function readMessage(req, res, next) {
    const { conversationId } = req.body

    const mongoReadMessage = mongoConnections.readMessageMongo(req, res, next, conversationId)
}


exports.createConversation = createConversation
exports.fetchAllConversations = fetchAllConversations
exports.createMessage = createMessage
exports.fetchConvo = fetchConvo
exports.readMessage = readMessage
