const express = require("express")
const authControllers = require('../controllers/authControllers')

const router = express.Router()

router.post('/signup', authControllers.userSignup)

module.exports = router