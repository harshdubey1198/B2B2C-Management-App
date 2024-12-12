const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middleware/auth.middleware');
const leadController = require('../controllers/lead.controller')

router.post('/create-lead',tokenVerification, leadController.createLead);
router.get('/get-leads', leadController.getAllLeads);
router.get('/get-lead/:id', leadController.getLeadById);
router.put('/update-lead/:id',tokenVerification, leadController.updateLead);
router.delete('/delete-lead/:id', tokenVerification, leadController.deleteLead);
router.post('/addnotes-lead/:id', tokenVerification, leadController.addNotesToLead);
router.get('/getnotes-lead/:id', leadController.getNotes);
router.put('/updatenotes-lead/:id', tokenVerification, leadController.updateNotesToLead);
router.delete('/deletenotes-lead/:id', tokenVerification, leadController.deleteNotesToLead);

module.exports = router;
