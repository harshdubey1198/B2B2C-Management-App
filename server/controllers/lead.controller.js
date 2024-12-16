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

leadController.addNotesToLead = async (req,res) => {
    try {
        const addedNotesToLead = await leadService.addNotesToLead(req.params.id, req.body)
        return res.status(200).json(createResult("notes added to lead Succefully", addedNotesToLead))
    } catch (error) {
        console.log("erroro adding notes to lead", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

leadController.getNotes = async (req,res) => {
    try {
        const getNotes = await leadService.getNotes(req.params.id)
        return res.status(200).json(createResult("Notes fetched Succefully", getNotes))
    } catch (error) {
        console.log("error getting notes", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

leadController.updateNotesToLead = async (req,res) => {
    try {
        const updatedNotes = await leadService.updateNotesToLead(req.params.id, req.body)
        return res.status(200).json(createResult("Notes updated Succefully", updatedNotes))
    } catch (error) {
        console.log("error updating notes", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

leadController.deleteNotesToLead = async (req,res) => {
    try {
        const Notes = await leadService.deleteNotesToLead(req.params.id, req.body)
        return res.status(200).json(createResult("Notes Removed Succefully", Notes))
    } catch (error) {
        console.log("error removing notes", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}


leadController.filteredLeads = async (req, res) => {
    try {
      const { isExpired, statuses } = req.body;
  
      const leads = await leadService.getExpiredLeadsWithoutUpdatedStatus({ isExpired, statuses });
  
      return res.status(200).json(createResult("Filtered missed leads fetched successfully", leads));
    } catch (error) {
      console.error("Error fetching filtered leads:", error.message);
      return res.status(500).json(createResult(null, null, error.message));
    }
  };
  
module.exports = leadController