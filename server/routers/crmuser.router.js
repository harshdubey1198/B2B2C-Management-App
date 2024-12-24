const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middleware/auth.middleware');
const crmUserController = require('../controllers/crmuser.controller')

router.post('/create-crmsuser/:id',tokenVerification, crmUserController.createCrmsUser);
router.get('/get-crmsuser/:id', crmUserController.getAllCrmsUsers);
router.post('/login-crmsuser', crmUserController.loginCrmsUsers);
// router.get('/get-crmsuser/:id',tokenVerification, crmUserController.getCrmsUserById);
router.put('/update-crmsuser/:id',tokenVerification, crmUserController.updateCrmsAccount);
// router.delete('/delete-crmsuser/:id', tokenVerification, crmUserController.deleteCrmsUser);

module.exports = router;
