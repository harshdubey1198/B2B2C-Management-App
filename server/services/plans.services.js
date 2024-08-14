const Plan = require('../schemas/plans.schema');

let services = {};
services.createPlan = createPlan;
services.getAllPlans = getAllPlans;
services.getPlanById = getPlanById;
services.updatePlan = updatePlan;
services.deletePlan = deletePlan;
services.approvePlan = approvePlan;
services.checkPlanValidity = checkPlanValidity;

async function createPlan(body) {
    try {
        const newPlan = new Plan(body);
        await newPlan.save();
        return { success: true, plan: newPlan };
    } catch (error) {
        console.error("Error creating plan:", error);
        return { success: false, error: 'Unable to create plan' };
    }
}

async function getAllPlans() {
    try {
        const plans = await Plan.find();
        return { success: true, plans };
    } catch (error) {
        console.error("Error fetching plans:", error);
        return { success: false, error: 'Unable to fetch plans' };
    }
}

async function getPlanById(planId) {
    try {
        const plan = await Plan.findById(planId);
        if (!plan) {
            return { success: false, error: 'Plan not found' };
        }
        return { success: true, plan };
    } catch (error) {
        console.error("Error fetching plan:", error);
        return { success: false, error: 'Unable to fetch plan' };
    }
}

async function updatePlan(planId, updateData) {
    try {
        const plan = await Plan.findById(planId);
        if (!plan) {
            return { success: false, error: 'Plan not found' };
        }

        Object.assign(plan, updateData);
        await plan.save();
        return { success: true, plan };
    } catch (error) {
        console.error("Error updating plan:", error);
        return { success: false, error: 'Unable to update plan' };
    }
}

async function deletePlan(planId) {
    try {
        const plan = await Plan.findByIdAndDelete(planId);
        if (!plan) {
            return { success: false, error: 'Plan not found' };
        }
        return { success: true, message: 'Plan deleted successfully' };
    } catch (error) {
        console.error("Error deleting plan:", error);
        return { success: false, error: 'Unable to delete plan' };
    }
}

async function approvePlan(planId) {
    try {
        const plan = await Plan.findById(planId);
        if (!plan) {
            return { success: false, error: 'Plan not found' };
        }

        plan.approvalDate = new Date();
        plan.validityEndDate = new Date();
        plan.validityEndDate.setDate(plan.validityEndDate.getDate() + 90);

        await plan.save();
        return { success: true, plan };
    } catch (error) {
        console.error("Error approving plan:", error);
        return { success: false, error: 'Unable to approve plan' };
    }
}

async function checkPlanValidity(planId) {
    try {
        const plan = await Plan.findById(planId);
        if (!plan) {
            return { success: false, error: 'Plan not found' };
        }

        const currentDate = new Date();
        const isValid = plan.validityEndDate && currentDate <= plan.validityEndDate;

        return { success: true, isValid, validityEndDate: plan.validityEndDate };
    } catch (error) {
        console.error("Error checking plan validity:", error);
        return { success: false, error: 'Unable to check plan validity' };
    }
}

module.exports = services;
