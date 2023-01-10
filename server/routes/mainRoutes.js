const express = require("express")

const router = express.Router()

const dummyUsers = [
    {
        "id": 1,
        "username": "cmacariovx"
    }
]
router.get('/', (req, res, next) => {
    console.log('GET Request in Main')
    res.json({
        "message": "it works!"
    })
})

router.get('/:uid', (req, res, next) => {
    const userId = req.params.uid
    const user = dummyUsers.find(user => {
        return user.id === +userId
    })

    res.json({"user": user})
})

module.exports = router