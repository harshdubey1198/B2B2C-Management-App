const express = require('express')
const router = express.Router()

const authServices = require("../services/auth.services")
const createSecretToken = require('../utils/secretToken')

router.post("/login", (req,res) => {
    authServices.userLogin(req.body).then(async (response) => {
        try {
            const token = createSecretToken(response._id)
            res.status(200).send({response,token})
        } catch (error) {
            console.log('first error', error)
            res.status(400).send(error)
        }
    }).catch((error) => {
        console.log(error, "err")
        res.status(400).send(error)
    })
})

router.post('/forget-password', async (req, res) => {
    authServices.UserForgetPassword(req.body).then((response) => {
        res.status(200).send(response)
    }).catch((error) => {
        console.log(error, "err")
        res.status(500).send(error)
    })
});

router.post('/reset-password', async (req,res) => {
    authServices.resetPassword(req.body).then((response) => {
        res.status(200).send(response)
    }).catch((error) => {
        console.log(error, "err")
        res.status(500).send(error)
    })
})

module.exports = router