const multer = require('multer');
const { createResult } = require('../utils/utills');
const crmUserService = require('../services/crmuser.services');
const { upload } = require('../utils/multer');
const uploadToCloudinary = require('../utils/cloudinary');
const createSecretToken = require('../utils/secretToken');
const crmUserController = {};

crmUserController.createCrmsUser = async (req, res) => {
    upload(req, res, async function (err) {
      try {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
          return res.status(400).json({ error: `File upload error: ${err.message}` });
        }
  
        // Extract the form data from req.body
        const registrationData = { ...req.body };
        // If a file is uploaded, handle Cloudinary upload
        if (req.files && req.files.avatar) {
          const imageUrl = await uploadToCloudinary(req.files.avatar[0].buffer); // Handle Cloudinary upload
          registrationData.avatar = imageUrl; // Attach the Cloudinary URL to the registration data
        }
  
        // Call the service to handle registration
        const response = await crmUserService.createCrmsUser(req.params.id, registrationData);
        return res.status(200).json(createResult("Registration Successfully", response));
      } catch (error) {
        console.log("Error Creating User", error);
        return res.status(400).json(createResult(null, null, error.message ));
      }
    });
};

crmUserController.loginCrmsUsers = async (req, res) => {
  try {
    const response = await crmUserService.loginCrmsUsers(req.body);
    const token = createSecretToken(response);
    return res.status(200).json(createResult("Login Successfully", {response ,token}));
  } catch (error) {
    console.log("error login users", error);
    return res.status(400).json(createResult(null, null, error.message));
  }
}

crmUserController.getAllCrmsUsers = async (req, res) => {
  try {
    const response = await crmUserService.getAllCrmsUsers(req.params.id);
      return res.status(200).json(createResult("Accounts fetched for firms successfully", response));
  } catch (error) {
      return res.status(400).json(createResult(null, null, error.message));
  }
}

crmUserController.getCrmsUsersAccount = async (req, res) => {
  try {
    const response = await crmUserService.getCrmsUsersAccount(req.params.id);
      return res.status(200).json(createResult("Account fetched successfully", response));
  } catch (error) {
      return res.status(400).json(createResult(null, null, error.message));
  }
}

crmUserController.updateCrmsAccount = async (req, res) => {
  try {
    const response = await crmUserService.updateCrmsAccount(req.params.id, req.body);
      return res.status(200).json(createResult("Account updated successfully", response));
  } catch (error) {
      return res.status(400).json(createResult(null, null, error.message));
  }
}

// Forget Password Controller
crmUserController.CRMUserForgetPassword = async (req, res) => {
  try {
    const response = await crmUserService.CRMUserForgetPassword(req.body);
    return res.status(200).json(createResult("Password updated successfully", response));
  } catch (error) {
    console.log("error forget-password users", error);
    return res.status(400).json(createResult(null, null, error.message));
  }
};

// RESET Password Controller
crmUserController.resetCRMUserPassword = async (req, res) => {
  try {
    const response = await crmUserService.resetCRMUserPassword(req.body);
    return res.status(200).json(createResult("Password updated successfully", response));
  } catch (error) {
    console.log("error forget-password users", error);
    return res.status(400).json(createResult(null, null, error.message));
  }
};

crmUserController.UpdatepasswordCrmsUsers = async (req, res) => {
  try {
    const response = await crmUserService.UpdatepasswordCrmsUsers(req.params.id, req.body);
      return res.status(200).json(createResult("Password updated successfully", response));
  } catch (error) {
      console.log("error updating-password users", error);
      return res.status(400).json(createResult(null, null, error.message));
  }
}

module.exports = crmUserController