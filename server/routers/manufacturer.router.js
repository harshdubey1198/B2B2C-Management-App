const express = require('express');
const router = express.Router();
const manufacturerController = require('../controllers/manufacturer.controller');
const { tokenVerification } = require('../middleware/auth.middleware');

router.post('/create-manufacturer', tokenVerification, manufacturerController.createManufacturer);
router.get('/get-manufacturers', tokenVerification, manufacturerController.getManufacturers);
router.get('/get-manufacturer/:id', tokenVerification, manufacturerController.getManufacturer);
router.put('/update-manufacturer/:id', tokenVerification, manufacturerController.updateManufacturer);
router.delete('/delete-manufacturer/:id', tokenVerification, manufacturerController.deleteManufacturer);

module.exports = router;
