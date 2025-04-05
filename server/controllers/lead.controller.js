const leadService = require("../services/lead.services");
const { upload } = require("../utils/multer");
const multer = require("multer");
const { createResult } = require("../utils/utills");

const leadController = {};

leadController.createLead = async (req, res) => {
  try {
    const newLead = await leadService.createLead(req.body);
    return res
      .status(200)
      .json(createResult("Lead created Succefully", newLead));
  } catch (error) {
    console.log("error creating lead", error.message);
    return res.status(500).json(createResult(null, null, error.message));
  }
};

leadController.importLeads = async (req, res) => {
  upload(req, res, async function (err) {
    try {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json(createResult(null, null, `Multer error: ${err.message}`));
      } else if (err) {
        return res
          .status(400)
          .json(createResult(null, null, `File upload error: ${err.message}`));
      }
      const { firmId } = req.body;
      if (!firmId) {
        return res
          .status(400)
          .json(createResult(null, null, "firmId is required"));
      }
      // Validate file existence
      if (!req.files || !req.files.file || req.files.file.length === 0) {
        return res
          .status(400)
          .json(createResult(null, null, "No file uploaded"));
      }

      // Process the CSV file (buffer) in the service
      // const leads = await leadService.importLeads(req.files.file[0].buffer, firmId);
      const file = req.files.file[0];
      const leads = await leadService.importLeads(file.buffer, firmId, file.originalname);

      return res.status(200).json(
        createResult("Leads imported successfully", {
          totalLeads: leads.length,
          leads,
        })
      );
    } catch (error) {
      console.error("Error importing leads:", error.message);
      return res
        .status(500)
        .json(
          createResult(null, null, error.message || "Internal Server Error")
        );
    }
  });
};

leadController.exportLeads = async (req, res) => {
  try {
    const getLeads = await leadService.exportLeads(req.body);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="selected_leads.csv"'
    );
    return res.status(200).send(getLeads);
  } catch (error) {
    console.log("error exporting leads", error.message);
    return res.status(500).json(createResult(null, null, error.message));
  }
};

leadController.getAllLeads = async (req, res) => {
  try {
    const getLeads = await leadService.getAllLeads();
    return res
      .status(200)
      .json(createResult("Lead fetched Succefully", getLeads));
  } catch (error) {
    console.log("error getting leads", error.message);
    return res.status(500).json(createResult(null, null, error.message));
  }
};

leadController.getLeadById = async (req, res) => {
  try {
    const getLead = await leadService.getLeadById(req.params.id);
    return res
      .status(200)
      .json(createResult("lead fetched Succefully", getLead));
  } catch (error) {
    console.log("error getting lead", error.message);
    return res.status(500).json(createResult(null, null, error.message));
  }
};
leadController.getLeadByFirmId = async (req, res) => {
  try {
    const getLead = await leadService.getLeadByFirmId(req.params.id);
    return res
      .status(200)
      .json(createResult("lead fetched Succefully", getLead));
  } catch (error) {
    console.log("error getting lead", error.message);
    return res.status(500).json(createResult(null, null, error.message));
  }
};

leadController.updateLead = async (req, res) => {
  try {
    const updatedLead = await leadService.updateLead(req.params.id, req.body);
    return res
      .status(200)
      .json(createResult("lead fetched Succefully", updatedLead));
  } catch (error) {
    console.log("error updating lead", error.message);
    return res.status(500).json(createResult(null, null, error.message));
  }
};

leadController.updateLeadStatus = async (req, res) => {
  try {
    const updatedLead = await leadService.updateLeadStatus(
      req.params.id,
      req.body
    );
    return res
      .status(200)
      .json(createResult("lead status updated Succefully", updatedLeadStatus));
  } catch (error) {
    console.log("error updating lead status", error.message);
    return res.status(500).json(createResult(null, null, error.message));
  }
};

leadController.deleteLead = async (req, res) => {
  try {
    const deletedLead = await leadService.deleteLead(req.params.id, req.body);
    return res
      .status(200)
      .json(createResult("lead soft deleted Succefully", deletedLead));
  } catch (error) {
    console.log("error deleting lead", error.message);
    return res.status(500).json(createResult(null, null, error.message));
  }
};
// In leadController.deleteMultipleLeads
leadController.deleteMultipleLeads = async (req, res) => {
  try {
    // Expecting req.body to directly contain an array of leadIds
    const leadIds = req.body.leadIds; // Ensure leadIds is an array

    if (!leadIds || !Array.isArray(leadIds)) {
      return res
        .status(400)
        .json(createResult(null, null, "Invalid leadIds format"));
    }

    // Call the service to delete the leads
    const deletedLeads = await leadService.deleteMultipleLeads(leadIds);
    return res
      .status(200)
      .json(createResult("Leads deleted successfully", deletedLeads));
  } catch (error) {
    console.log("Error deleting leads:", error.message);
    return res.status(500).json(createResult(null, null, error.message));
  }
};

leadController.addNotesToLead = async (req, res) => {
  try {
    const addedNotesToLead = await leadService.addNotesToLead(
      req.params.id,
      req.body
    );
    return res
      .status(200)
      .json(createResult("notes added to lead Succefully", addedNotesToLead));
  } catch (error) {
    console.log("erroro adding notes to lead", error.message);
    return res.status(500).json(createResult(null, null, error.message));
  }
};

leadController.getNotes = async (req, res) => {
  try {
    const getNotes = await leadService.getNotes(req.params.id);
    return res
      .status(200)
      .json(createResult("Notes fetched Succefully", getNotes));
  } catch (error) {
    console.log("error getting notes", error.message);
    return res.status(500).json(createResult(null, null, error.message));
  }
};

leadController.updateNotesToLead = async (req, res) => {
  try {
    const updatedNotes = await leadService.updateNotesToLead(
      req.params.id,
      req.body
    );
    return res
      .status(200)
      .json(createResult("Notes updated Succefully", updatedNotes));
  } catch (error) {
    console.log("error updating notes", error.message);
    return res.status(500).json(createResult(null, null, error.message));
  }
};

leadController.deleteNotesToLead = async (req, res) => {
  try {
    const Notes = await leadService.deleteNotesToLead(req.params.id, req.body);
    return res
      .status(200)
      .json(createResult("Notes Removed Succefully", Notes));
  } catch (error) {
    console.log("error removing notes", error.message);
    return res.status(500).json(createResult(null, null, error.message));
  }
};

leadController.filteredLeads = async (req, res) => {
  try {
    const { isExpired, statuses } = req.body;

    const leads = await leadService.getExpiredLeadsWithoutUpdatedStatus({
      isExpired,
      statuses,
    });

    return res
      .status(200)
      .json(createResult("Filtered missed leads fetched successfully", leads));
  } catch (error) {
    console.error("Error fetching filtered leads:", error.message);
    return res.status(500).json(createResult(null, null, error.message));
  }
};
leadController.updateLeadStatus = async (req, res) => {
  try {
    const updatedLead = await leadService.updateLeadStatus(
      req.params.id,
      req.body
    );
    return res
      .status(200)
      .json(createResult("lead status updated Succefully", updatedLead));
  } catch (error) {
    console.log("error updating lead status", error.message);
    return res.status(500).json(createResult(null, null, error.message));
  }
};

module.exports = leadController;
