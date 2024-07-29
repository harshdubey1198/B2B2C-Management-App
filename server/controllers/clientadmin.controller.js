const express = require('express')
const router = express.Router()

const ClientServices = require('../services/clientadmin.services')

router.post('/', async (req, res) => {
    ClientServices.clietRegistration(req.body).then((response) => {
        res.status(200).send(response)
    }).catch((error) => {
        console.log(error, "err")
        res.status(500).send(error)
    })
});

module.exports = router