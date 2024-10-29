const { response } = require("express");
const authService = require("../services/auth.services");
const createSecretToken = require("../utils/secretToken");
const uploadToCloudinary = require("../utils/cloudinary");
const { upload } = require("../utils/multer");
const multer = require("multer");
const { createResult } = require("../utils/utills");


const authController = {};

// REGISTER
authController.register = async (req, res) => {
  try {
    const user = await authService.Registration(req.body);
    return res.status(200).json({ message: "Register successfully", user });
  } catch (error) {
    console.log("error register users", error);
    return res.status(500).json({ message: error });
  }
};

// VERIFY OTP
authController.verifyOtp = async (req, res) => {
  try {
    const response = await authService.verifyOtp(req.body);
    return res.status(200).json(createResult("OTP Verified Successfully", response, false));
  } catch (error) {
    console.log("error verify otp", error);
    return res.status(400).json(createResult(error.message, null, true));
  }
};

// RESET OTP
authController.resendOtp = async (req, res) => {
  try {
    const response = await authService.resendOtp(req.body);
    return res.status(200).json(createResult("OTP Resent Successfully", response));
  } catch (error) {
    console.log("error sending otp again", error);
    return res.status(400).json(createResult(null, null, error.message));
  }
};

// Login Controller
authController.login = async (req, res) => {
  try {
    const response = await authService.userLogin(req.body);
    const token = createSecretToken(response);
    return res.status(200).json(createResult("Login Successfully", {response ,token}));
  } catch (error) {
    console.log("error login users", error);
    return res.status(400).json(createResult(null, null, error.message));
  }
};

// Forget Password Controller
authController.forgetPassword = async (req, res) => {
  try {
    const response = await authService.UserForgetPassword(req.body);
    res.status(200).json({ message: response });
  } catch (error) {
    console.log("error forget-password users", error);
    res.status(400).json({ error: error.toString() });
  }
};

// Reset Password Controller
authController.resetPassword = async (req, res) => {
  try {
    const response = await authService.resetPassword(req.body);
    res.status(200).json({ message: response });
  } catch (error) {
    console.log("Error reseting-password users", error);
    res.status(400).json({ error: error.toString() });
  }
};

// CREATE USER
// authController.registration = async (req, res) => {
//   upload(req, res, async function (err) {
//     try {
//       if (err instanceof multer.MulterError) {
//         return res.status(400).json({ error: `Multer error: ${err.message}` });
//     } else if (err) {
//         return res.status(400).json({ error: `File upload error: ${err.message}` });
//     }

//       const updatedData = { ...req.body }
//       console.log(updatedData,"jdd")
//       if (req.files && req.files.avatar) {
//         const imageUrl = await uploadToCloudinary(req.files.avatar[0].buffer); // Handle Cloudinary upload
//         updatedData.avatar = imageUrl; // Attach the Cloudinary URL to the update data
//       }
//       console.log(updatedData.avatar,"updatd ")
//       const response = await authService.registration(req.params.id, updatedData);
//       res.status(200).json(response);
//     } catch (error) {
//       console.log("Error Creating User", error);
//     res.status(400).json({ error: error.toString() });
//     }
//   })
// };
// authController.registration = async (req, res) => {
//   try {
//     const response = await authService.registration(req.params.id, req.body);
//     return res.status(200).json(createResult("Registration Successfully", response));
//   } catch (error) {
//     console.log("Error Creating User", error);
//     return res.status(400).json(createResult(null, null, error.message));
//   }
// };
authController.registration = async (req, res) => {
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
      const response = await authService.registration(req.params.id, registrationData);
      return res.status(200).json(createResult("Registration Successfully", response));
    } catch (error) {
      console.log("Error Creating User", error);
      return res.status(400).json(createResult(null, null, error.message ));
    }
  });
};


// GET ACCOUNT
authController.getAccount = async (req, res) => {
  try {
    const response = await authService.getAccount(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    console.log("Error Creating User", error);
    res.status(400).json({ error: error.toString() });
  }
};

// GET FIRMS
authController.getCompany = async (req, res) => {
  try {
    const response = await authService.getCompany(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    console.log("Error Getting Account", error);
    res.status(400).json({ error: error.toString() });
  }
};
authController.getfirm = async (req, res) => {
  try {
    const response = await authService.getfirm(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    console.log("Error Getting Account", error);
    res.status(400).json({ error: error.toString() });
  }
};

// UPDATE ACCOUNT
// authController.updateAccount = async (req, res) => {
//     try {
//         const updateData = req.body;

//         if (req.file) {
//             // Upload the profile picture to Cloudinary
//             const imageUrl = await uploadToCloudinary(req.file.buffer);
//             updateData.avatar = imageUrl;
//         }
//         const response = await authService.updateAccount(req.params.id, updateData);
//         res.status(200).json(response);
//     } catch (error) {
//         console.log("Error Updating Account", error)
//         res.status(400).json({ error: error });
//     }
// };

authController.updateAccount = async (req, res) => {
    upload(req, res, async function (err) {
        try {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: `Multer error: ${err.message}` });
            } else if (err) {
                return res.status(400).json({ error: `File upload error: ${err.message}` });
            }

             // Extract the form data from req.body
             const updateData = { ...req.body };

            // If a file is uploaded, handle Cloudinary upload
            if (req.files && req.files.avatar) {
                const imageUrl = await uploadToCloudinary(req.files.avatar[0].buffer); // Handle Cloudinary upload
                updateData.avatar = imageUrl; // Attach the Cloudinary URL to the update data
            }

            // Call the service to update the user's account
            const response = await authService.updateAccount(req.params.id, updateData);
            res.status(200).json(response);
        } catch (error) {
            console.log("Error Updating Account", error);
            res.status(400).json({ error: "Unable to update account. Please try again later." });
        }
    });
};

// COUNT CLIENT ADMIN
authController.countUsers = async (req, res) => {
  try {
    const response = await authService.countUsers(req.body);
    res
      .status(200)
      .json({ message: "Users Count Retrieved Successfully", count: response });
  } catch (error) {
    console.log("Error Retrieving Client Admin Count", error);
    res.status(400).json({ error: error });
  }
};

// FIRMS UNDER CLIENT ADMIN
authController.getFirmUnderClient = async (req, res) => {
  try {
    const response = await authService.getFirmUnderClient();
    res
      .status(200)
      .json({
        message: "Firms Under Client Admin Retrieved Successfully",
        response: response,
      });
  } catch (error) {
    console.log("Error Retrieving Firms Under Client Admin", error);
    res.status(400).json({ error: error });
  }
};

module.exports = authController;
