const express = require('express')
const router = express.Router()

const SuperAdminService = require('../services/superadmin.services')

// LOGIN FOR SUPERADMIN
router.post('/login', (req,res) => {
    const {email, password} = req.body
    SuperAdminService.superAdminLogin(email, password).then((response) => {
        res.status(200).send('OK')
    }).catch((err) => {
        res.status(500).send(err)
    })
})

module.exports = router