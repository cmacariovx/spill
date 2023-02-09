const express = require("express")

const profileControllers = require("../controllers/profileControllers")
const checkAuth = require("../middleware/check-auth")

const router = express.Router()

router.use(checkAuth)

router.post("/fetchProfilePosts", profileControllers.fetchProfilePosts)

router.post("/fetchLikedPosts", profileControllers.fetchLikedPosts)

router.post("/likedPostsPrivate", profileControllers.likedPostsPrivate)

router.post("/likedPostsPublic", profileControllers.likedPostsPublic)

router.post("/fetchSettings", profileControllers.fetchSettings)

router.post("/:username", profileControllers.fetchUserProfile)

module.exports = router
