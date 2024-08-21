const express = require('express')
const router = express.Router()

const authServices = require("../services/auth.services")

router.post("/createUser", (req,res) => {
    console.log(req.body, "body")
    authServices.createUser(req.body).then((response) => {
        res.status(200).send(response)
    }).catch((error) => {
        console.log(error , "error creating users")
        res.status(500).send(error)
    })
})

module.exports = router