const { response } = require("express");
const authService = require("../services/auth.services")
const createSecretToken = require('../utils/secretToken');
const uploadToCloudinary = require("../utils/cloudinary");

const authController = {};

// REGISTER
authController.register = async (req, res) => {
    try {
        const user = await authService.Registration(req.body);
        return res.status(200).json({ message: "Register successfully", user });
    } catch (error) {
        console.log("error register users", error)
        return res.status(500).json({ message: error });
    }
};

// VERIFY OTP
authController.verifyOtp = async (req, res) => {
    try {
        const response = await authService.verifyOtp(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log("error verify otp", error)
        return res.status(500).json({ message: error });
    }
}

// RESET OTP
authController.resendOtp = async (req, res) => {
    try {
        const response = await authService.resendOtp(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log("error sending otp again", error)
        return res.status(500).json({ message: error });
    }
}


// Login Controller
authController.login = async (req, res) => {
    try {
        const response = await authService.userLogin(req.body);
        const token = createSecretToken(response);
        res.status(200).json({ response, token });
    } catch (error) {
        console.log("error login users", error)
        res.status(400).json({ error: error.toString()});
    }
};

// Forget Password Controller
authController.forgetPassword = async (req, res) => {
    try {
        const response = await authService.UserForgetPassword(req.body);
        res.status(200).json({ message: response });
    } catch (error) {
        console.log("error forget-password users", error)
        res.status(400).json({ error: error.toString() });
    }
};

// Reset Password Controller
authController.resetPassword = async (req,res) => {
    try {
        const response = await authService.resetPassword(req.body);
        res.status(200).json({ message: response });
    } catch (error) {
        console.log("Error reseting-password users", error)
        res.status(400).json({ error: error.toString() });
    }
};

// CREATE USER
authController.registration = async (req,res) => {
    try {
        const data = req.body;

        if (req.file) {
            // Upload the profile picture to Cloudinary
            const imageUrl = await uploadToCloudinary(req.file.buffer);
            data.avatar = imageUrl; 
        }
        const response = await authService.registration(req.params.id, data);
        res.status(200).json( response );
    } catch (error) {
        console.log("Error Creating User", error)
        res.status(400).json({ error: error.toString() });
    }
};

// GET ACCOUNT 
authController.getAccount = async (req,res) => {
    try {
        const response = await authService.getAccount(req.params.id);
        res.status(200).json( response );
    } catch (error) {
        console.log("Error Creating User", error)
        res.status(400).json({ error: error.toString() });
    }
};

// GET FIRMS 
authController.getCompany =  async (req,res) => {
    try {
        const response = await authService.getCompany(req.params.id);
        res.status(200).json( response );
    } catch (error) {
        console.log("Error Getting Account", error)
        res.status(400).json({ error: error.toString() });
    }
};

// UPDATE ACCOUNT
authController.updateAccount = async (req, res) => {
    try {
        const updateData = req.body;

        if (req.file) {
            // Upload the profile picture to Cloudinary
            const imageUrl = await uploadToCloudinary(req.file.buffer);
            updateData.avatar = imageUrl; 
        }
        const response = await authService.updateAccount(req.params.id, updateData);
        res.status(200).json(response);
    } catch (error) {
        console.log("Error Updating Account", error)
        res.status(400).json({ error: error });
    }
};

// COUNT CLIENT ADMIN
authController.countUsers = async (req, res) => {
    try {
        const response = await authService.countUsers(req.body);
        res.status(200).json({message: "Users Count Retrieved Successfully", count : response});
    } catch (error) {
        console.log("Error Retrieving Client Admin Count", error)
        res.status(400).json({ error: error });
    }
};

// FIRMS UNDER CLIENT ADMIN
authController.getFirmUnderClient = async (req, res) => {
    try {
        const response = await authService.getFirmUnderClient();
        res.status(200).json({message: "Firms Under Client Admin Retrieved Successfully", response : response});
    } catch (error) {
        console.log("Error Retrieving Firms Under Client Admin", error)
        res.status(400).json({ error: error });
    }
};

module.exports = authController;
