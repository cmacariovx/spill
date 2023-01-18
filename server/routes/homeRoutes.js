const express = require("express")

const homeControllers = require("../controllers/homeControllers")
const checkAuth = require("../middleware/check-auth")

const router = express.Router()

router.use(checkAuth)

router.get("/home") // create function to load home page // cant because front end is on localhost 3000, routes are same but on diff domains

module.exports = router