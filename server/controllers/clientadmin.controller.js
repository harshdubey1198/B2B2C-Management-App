const express = require('express')
const router = express.Router()

const ClientServices = require('../services/clientadmin.services');
const createSecretToken = require('../utils/secretToken');

router.post('/register', async (req, res) => {
    ClientServices.clientRegistration(req.body).then((response) => {
        res.status(200).send(response)
    }).catch((error) => {
        console.log(error, "err")
        res.status(500).send(error)
    })
});

router.get("/getclients", async (req,res) => {
    ClientServices.getRegiteredUser().then((response) => {
        res.status(200).send(response)
    }).catch((error) => {
        console.log(error, "err")
        res.status(500).send(error)
    })
})

router.post("/login", (req,res) => {
    ClientServices.userLogin(req.body).then(async (response) => {
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
    ClientServices.UserForgetPassword(req.body).then((response) => {
        res.status(200).send(response)
    }).catch((error) => {
        console.log(error, "err")
        res.status(500).send(error)
    })
});

router.post('/reset-password', async (req,res) => {
    ClientServices.resetPassword(req.body).then((response) => {
        res.status(200).send(response)
    }).catch((error) => {
        console.log(error, "err")
        res.status(500).send(error)
    })
})

module.exports = router