const express = require('express')
const router = express.Router()

const authServices = require("../services/auth.services")
const createSecretToken = require('../utils/secretToken')

const authController = {};

// Login Controller
authController.login = async (req, res) => {
    try {
        const user = await authServices.userLogin(req.body);
        const token = createSecretToken(user._id);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.toString() });
    }
};

// router.post('/forget-password', async (req, res) => {
//     authServices.UserForgetPassword(req.body).then((response) => {
//         res.status(200).send(response)
//     }).catch((error) => {
//         console.log(error, "err")
//         res.status(500).send(error)
//     })
// });

// router.post('/reset-password', async (req,res) => {
//     authServices.resetPassword(req.body).then((response) => {
//         res.status(200).send(response)
//     }).catch((error) => {
//         console.log(error, "err")
//         res.status(500).send(error)
//     })
// })

// router.post("/createUser", (req, res) => {
//     // console.log(req.body, "body");
//     authServices.createUser(req.body).then((response) => {
//         res.status(200).send(response);
//     })
//     .catch((error) => {
//         console.log(error, "error creating users");
//         res.status(500).send(error);
//     });
// });

// module.exports = router

module.exports = authController;
