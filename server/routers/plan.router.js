const express = require('express')
const router = express.Router()
const planController = require('../controllers/plans.controller')

router.post('/create/:id' , planController.createPlan)
router.get('/all' , planController.getAllPLans)
router.get('/:id' , planController.getPLan)
router.put('/update/:id', planController.updatePlan)
router.delete('/delete/:id', planController.deletePlan)

module.exports = router