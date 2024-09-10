const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/forget-password', authController.forgetPassword);

module.exports = router