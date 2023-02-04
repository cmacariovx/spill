const express = require("express")

const profileControllers = require("../controllers/profileControllers")
const checkAuth = require("../middleware/check-auth")

const router = express.Router()

router.use(checkAuth)

router.post("/fetchPersonalPosts", profileControllers.fetchPersonalPosts)

router.post("/:username", profileControllers.fetchUserProfile)

module.exports = router
