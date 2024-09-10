const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forget-password', authController.forgetPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/createUser/:id', authController.registration);
router.get('/getCompany/:id', authController.getCompany);
router.put('/update/:id', authController.updateAccount);

module.exports = router