const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middleware/auth.middleware');
const bomController = require('../controllers/bom.controller');

router.post('/create-bom', tokenVerification, bomController.createbom);
router.get('/get-bom', bomController.getboms);
router.get('/get-bom/:id', bomController.getbomById);
router.put('/update-bom/:id', tokenVerification, bomController.updatebom);
router.put('/update-bomstatus/:id', tokenVerification, bomController.updatebomStatus);
router.delete('/delete-bom/:id', tokenVerification, bomController.deletebom);

module.exports = router;
