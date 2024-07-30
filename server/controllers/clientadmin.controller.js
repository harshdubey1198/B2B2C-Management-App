const express = require('express')
const router = express.Router()

const ClientServices = require('../services/clientadmin.services')

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

router.post("/", async (req,res) => {
    ClientServices.clientLogin(req.body).then((response) => {
        res.status(200).send(response)
    }).catch((error) => {
        console.log(error, "err")
        res.status(500).send(error)
    })
})
module.exports = router