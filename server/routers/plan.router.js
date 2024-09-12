const express = require('express')
const router = express.Router()
const planController = require('../controllers/plans.controller')
const { tokenVerification } = require('../middleware/auth.middleware');

router.post('/create/:id' ,tokenVerification, planController.createPlan)
router.get('/all' , tokenVerification, planController.getAllPLans)
router.get('/:id' , tokenVerification , planController.getPLan)
router.put('/update/:id', tokenVerification, planController.updatePlan)
router.delete('/delete/:id', tokenVerification, planController.deletePlan)

module.exports = router