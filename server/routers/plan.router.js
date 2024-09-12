const express = require('express')
const router = express.Router()
const planController = require('../controllers/plans.controller')
const { tokenVerification } = require('../middleware/auth.middleware');

router.post('/create/:id' ,tokenVerification, planController.createPlan)
router.get('/all' , planController.getAllPLans)
router.get('/:id' , planController.getPLan)
router.put('/update/:id', planController.updatePlan)
router.delete('/delete/:id', planController.deletePlan)

module.exports = router