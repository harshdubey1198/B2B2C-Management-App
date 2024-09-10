const { response } = require("express");
const authService = require("../services/auth.services")
const createSecretToken = require('../utils/secretToken')

const authController = {};

// REGISTER
authController.register = async (req, res) => {
    try {
        const user = await authService.Registration(req.body);
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

// CREATE USER
authController.registration = async (req,res) => {
    try {
        const response = await authService.registration(req.params.id, req.body);
        res.status(200).json( response );
    } catch (error) {
        res.status(400).json({ error: error.toString() });
    }
};

// GET FIRMS 
authController.getCompany =  async (req,res) => {
    try {
        const response = await authService.getCompany(req.params.id);
        res.status(200).json( response );
    } catch (error) {
        res.status(400).json({ error: error.toString() });
    }
};

module.exports = authController;
