const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller');
const { tokenVerification, superAdminTokenVerification } = require('../middleware/auth.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forget-password', authController.forgetPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/createUser/:id', authController.registration);
router.get('/getAccount/:id', authController.getAccount);
router.get('/getCompany/:id', authController.getCompany);
router.put('/update/:id', tokenVerification, authController.updateAccount);
router.post('/verify-otp', authController.verifyOtp);
router.post('/resend-otp', authController.resendOtp);
router.post('/count-company',tokenVerification, authController.countUsers);
router.get('/getCompanyFirms',tokenVerification, superAdminTokenVerification, authController.getFirmUnderClient);

module.exports = router