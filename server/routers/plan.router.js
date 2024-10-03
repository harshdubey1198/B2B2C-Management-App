const express = require('express')
const router = express.Router()
const planController = require('../controllers/plans.controller')
const { tokenVerification, superAdminTokenVerification } = require('../middleware/auth.middleware');

router.post('/create/:id' ,tokenVerification, superAdminTokenVerification, planController.createPlan)
router.get('/all' , tokenVerification, planController.getAllPLans)
router.get('/:id' , tokenVerification , planController.getPLan)
router.get('/firmplan/:id' , tokenVerification , planController.getFirmPLan)
router.put('/update/:id', tokenVerification, superAdminTokenVerification, planController.updatePlan)
router.delete('/delete/:id', tokenVerification, superAdminTokenVerification, planController.deletePlan)

module.exports = router