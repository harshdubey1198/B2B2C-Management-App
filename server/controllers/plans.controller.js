const express = require('express');
const router = express.Router();

const PlansServices = require('../services/plans.services');

router.post('/create', async (req, res) => {
    try {
        const response = await PlansServices.createPlan(req.body);
        res.status(200).send(response);
    } catch (error) {
        console.log('Create Plan Error:', error);
        res.status(500).send({ error: 'Unable to create plan' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const response = await PlansServices.getAllPlans();
        res.status(200).send(response);
    } catch (error) {
        console.log('Get All Plans Error:', error);
        res.status(500).send({ error: 'Unable to fetch plans' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const response = await PlansServices.getPlanById(req.params.id);
        res.status(200).send(response);
    } catch (error) {
        console.log('Get Plan By ID Error:', error);
        res.status(500).send({ error: 'Unable to fetch plan' });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const response = await PlansServices.updatePlan(req.params.id, req.body);
        res.status(200).send(response);
    } catch (error) {
        console.log('Update Plan Error:', error);
        res.status(500).send({ error: 'Unable to update plan' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await PlansServices.deletePlan(req.params.id);
        res.status(200).send(response);
    } catch (error) {
        console.log('Delete Plan Error:', error);
        res.status(500).send({ error: 'Unable to delete plan' });
    }
});

module.exports = router;
