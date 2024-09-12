const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller');
const { tokenVerification } = require('../middleware/auth.middleware');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forget-password', authController.forgetPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/createUser/:id', authController.registration);
router.get('/getCompany/:id', authController.getCompany);
router.put('/update/:id', tokenVerification, authController.updateAccount);
router.post('/verify-otp', authController.verifyOtp);
router.post('/resend-otp', authController.resendOtp);

module.exports = router