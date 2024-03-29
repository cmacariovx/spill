const express = require("express")

const homeControllers = require("../controllers/homeControllers")
const checkAuth = require("../middleware/check-auth")

const router = express.Router() // /home/...

router.use(checkAuth)

router.post("/createPost", homeControllers.createPost)

router.post("/searchUsers", homeControllers.searchUsers)

router.post("/follow", homeControllers.followUser)

router.post("/unfollow", homeControllers.unfollowUser)

router.post("/fetchPosts", homeControllers.fetchPosts)

router.post("/fetchComments", homeControllers.fetchComments)

router.post("/createComment", homeControllers.createComment)

router.post("/likePost", homeControllers.likePost)

router.post("/unlikePost", homeControllers.unlikePost)

router.post("/deletePost", homeControllers.deletePost)

router.post("/deleteComment", homeControllers.deleteComment)

module.exports = router
