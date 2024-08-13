const express = require('express')
const router = express.Router()

const authServices = require("../services/auth.services")

router.post("/createUser", (req,res) => {
    authServices.createUser(req.body, req.params.id).then((response) => {
        res.status(200).send(response)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

module.exports = router