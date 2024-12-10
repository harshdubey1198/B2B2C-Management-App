const leadService = require("../services/lead.services");
const { createResult } = require("../utils/utills");

const leadController = {}

leadController.createLead = async (req,res) => {
    try {
        const newLead = await leadService.createLead(req.body)
        return res.status(200).json(createResult("Lead created Succefully", newLead))
    } catch (error) {
        console.log("error creating lead", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

leadController.getAllLeads = async (req,res) => {
    try {
        const getLeads = await leadService.getAllLeads()
        return res.status(200).json(createResult("Lead fetched Succefully", getLeads))
    } catch (error) {
        console.log("error getting leads", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

leadController.getLeadById = async (req,res) => {
    try {
        const getLead = await leadService.getLeadById(req.params.id)
        return res.status(200).json(createResult("lead fetched Succefully", getLead))
    } catch (error) {
        console.log("error getting lead", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

leadController.updateLead = async (req,res) => {
    try {
        const updatedLead = await leadService.updateLead(req.params.id, req.body)
        return res.status(200).json(createResult("lead fetched Succefully", updatedLead))
    } catch (error) {
        console.log("error updating lead", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

leadController.deleteLead = async (req,res) => {
    try {
        const deletedLead = await leadService.deleteLead(req.params.id, req.body)
        return res.status(200).json(createResult("lead soft deleted Succefully", deletedLead))
    } catch (error) {
        console.log("error deleting lead", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

module.exports = leadController