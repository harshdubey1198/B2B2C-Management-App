const Plan = require('../schemas/plans.schema');
const SuperAdmin = require('../schemas/superadmin.schema');
const User = require('../schemas/user.schema');

let authService = {};

authService.createPlan = async (id,data) => {
    try {
        const superAdmin = await User.findById(id).select("-password");
        if (!superAdmin) {
            return Promise.reject("Not authorized to add plan");
        }
        if(superAdmin.role !== 'super_admin'){
            return Promise.reject("Not authorized to add plan");
        }

        const existingPlan = await Plan.findOne({ title: data.title });
        if (existingPlan) {
            return Promise.reject("A plan with this title already exists.");
        }

        const plan = await Plan.create(data);
        return plan;
    } catch (err) {
        console.log("error adding plan", err);
        return Promise.reject("Error adding plan. Try again later!");
    }
}

authService.getAllPlans = async () => {
    try {
        const plans = await Plan.find();
        return plans;
    } catch (error) {
        console.error("Error fetching plans:", error);
        return Promise.reject("Unable to Fetch Plans");
    }
}

authService.getPlanById = async (planId) => {
    try {
        const plan = await Plan.findById(planId);
        if (!plan) {
            return Promise.reject("Plan not found");
        }
        return plan;
    } catch (error) {
        console.error("Error fetching plan:", error);
        return Promise.reject("Unable to Fetch Plan");
    }
}

authService.updatePlan = async (planId, updateData)  => {
    try {
        const updatedPlan = await Plan.findOneAndUpdate( { _id: planId }, updateData, { new: true } );
        if (!updatedPlan) {
            return Promise.reject("Plan not found or update failed");
        }
        
        return updatedPlan
    } catch (error) {
        console.error("Error updating plan:", error);
        return Promise.reject("Unable to Update Plan");
    }
}

async function deletePlan(planId) {
    try {
        const plan = await Plan.findByIdAndDelete(planId);
        if (!plan) {
            return Promise.reject("Unable to Find Plan");
        }
        return 'Plan deleted successfully';
    } catch (error) {
        console.error("Error deleting plan:", error);
        return Promise.reject("Unable to Delete Plan");
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

module.exports = authService;
