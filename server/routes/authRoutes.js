const express = require("express")
const authControllers = require('../controllers/authControllers')

const router = express.Router()

router.post('/signup', authControllers.userSignup)

router.post('/login', authControllers.userLoginMain) // Options request made here on login credentials

module.exports = router