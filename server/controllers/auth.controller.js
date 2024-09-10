const { response } = require("express");
const authService = require("../services/auth.services")
const createSecretToken = require('../utils/secretToken')

const authController = {};

// REGISTER
authController.register = async (req, res) => {
    try {
        const user = await userService.registration(req.body);
        return res.status(200).json({ message: "Register successfully", user });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

// Login Controller
authController.login = async (req, res) => {
    try {
        const response = await authService.userLogin(req.body);
        const token = createSecretToken(response._id);
        res.status(200).json({ response, token });
    } catch (error) {
        res.status(400).json({ error: error.toString() });
    }
};

// Forget Password Controller
authController.forgetPassword = async (req, res) => {
    try {
        const response = await authService.UserForgetPassword(req.body);
        res.status(200).json({ message: response });
    } catch (error) {
        res.status(400).json({ error: error.toString() });
    }
};

// Reset Password Controller
authController.resetPassword = async (req,res) => {
    try {
        const response = await authService.resetPassword(req.body);
        res.status(200).json({ message: response });
    } catch (error) {
        res.status(400).json({ error: error.toString() });
    }
};

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
