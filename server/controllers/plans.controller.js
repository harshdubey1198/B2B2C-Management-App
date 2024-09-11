const PlansServices = require('../services/plans.services');

const planController = {}
// CREATE PLAN
planController.createPlan = async (req, res) => {
    try {
        const response = await PlansServices.createPlan(req.params.id, req.body);
        return res.status(200).json({ message: "Plan created Succesfully", response });
    } catch (error) {
        console.log("error register users", error)
        return res.status(500).json({ message: error });
    }
}

// GET ALL PLANS
planController.getAllPLans = async  (req, res) => {
    try {
        const response = await PlansServices.getAllPlans();
        return res.status(200).json({ message: "Get All Plans", response });
    } catch (error) {
        console.log('Get All Plans Error:', error);
        return res.status(500).json({ message: error });
    }
};

// // GET PLAN
planController.getPLan = async  (req, res) => {
    try {
        const response = await PlansServices.getPlanById(req.params.id);
        return res.status(200).json({ message: "Get Plans", response });
    } catch (error) {
        console.log('Get Plan By ID Error:', error);
        return res.status(500).json({ message: error });
    }
}

// // UPDATE PLAN
planController.updatePlan = async  (req, res) => {
    try {
        const response = await PlansServices.updatePlan(req.params.id, req.body);
        return res.status(200).json({ message: "Succesfully Updated Plan", response });
    } catch (error) {
        console.log('Error Updating plan:', error);
        return res.status(500).json({ message: error });
    }
}

// DELETE PLAN
planController.deletePlan = async  (req, res) => {
    try {
        const response = await PlansServices.deletePlan(req.params.id);
        return res.status(200).json({ message: "Succesfully Deleted Plan", response });
    } catch (error) {
        console.log('Error Deleting plan:', error);
        return res.status(500).json({ message: error });
    }
}

module.exports = planController;