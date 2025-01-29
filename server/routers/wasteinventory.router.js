const express = require('express');
const router = express.Router();
const wasteManagmentController = require('../controllers/wasteinventory.controller');
const { tokenVerification } = require('../middleware/auth.middleware');

router.get('/get-wasteManagments/:id', wasteManagmentController.getwasteManagments);
router.get('/get-wasteManagment/:id', wasteManagmentController.getwasteManagmentById);
// router.put('/update-wasteManagment/:id', tokenVerification, wasteManagmentController.updatewasteManagment);
// router.delete('/delete-wasteManagment/:id', tokenVerification, wasteManagmentController.deletewasteManagment);

module.exports = router;
