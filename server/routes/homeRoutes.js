const express = require("express")

const homeControllers = require("../controllers/homeControllers")
const checkAuth = require("../middleware/check-auth")

const router = express.Router() // /home/...

router.use(checkAuth)

router.post("/createPost", homeControllers.createPost)

module.exports = router