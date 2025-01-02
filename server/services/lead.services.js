const Lead = require("../schemas/lead.schema");
const csvtojson = require('csvtojson');
const { Parser } = require('json2csv');

const leadService = {};

// leadService.createLead = async (body) => {
//   const {firstName, lastName, email, mobileNumber, adId, adName, adSetId, campaignId, formId, formName, isOrganic, platform, phoneNumber, lastQualification, yearOfPassout, status,} = body;

//   // Validate required fields manually
// //   if (!firstName || !lastName || !email || !mobileNumber) {
// //     throw new Error(
// //       "Missing required fields: firstName, lastName, email, or mobileNumber."
// //     );
// //   }

// //   // Check for duplicate leads by email
// //   const existingLead = await Lead.findOne({ email: email });
// //   if (existingLead) {
// //     throw new Error("Lead with this email already exists.");
// //   }

//   // Create and save a new lead
//   const newLead = new Lead(
//     // firstName,
//     // lastName,
//     // email,
//     // mobileNumber,
//     // adId,
//     // adName,
//     // adSetId,
//     // campaignId,
//     // formId,
//     // formName,
//     // isOrganic,
//     // platform,
//     // phoneNumber,
//     // lastQualification,
//     // yearOfPassout,
//     // status,
//     body,
//   );

//   await newLead.save();
//   return newLead;
// };


leadService.createLead = async (body) => {
    const { firstName, lastName, email, mobileNumber, adId, adName, adSetId, campaignId, formId, formName, isOrganic, platform, phoneNumber, lastQualification, yearOfPassout, status } = body;
  
    // Ensure the status is set to 'new' if it's not provided
    const leadStatus = 'new';
  
    // Create and save a new lead, setting the status to 'new' explicitly
    const newLead = new Lead({
      ...body, // Spread the properties from the body
      status: leadStatus // Override or set the status to 'new'
    });
  
    await newLead.save();
    return newLead;
  };


leadService.importLeads = async (fileBuffer) => {
    try {
      // Parse the CSV buffer into JSON
      const leads = await csvtojson().fromString(fileBuffer.toString());
  
      const processedLeads = leads.map(lead => ({
        ...lead,
        isOrganic: lead.isOrganic === "TRUE",  // Convert "TRUE" to true and "FALSE" to false
        status: 'new',
      }));
     
    if (leads.length === 0) {
        throw new Error("No data found in the file.");
    }
  
      // Insert valid leads into the database
      const savedLeads = await Lead.insertMany(leads);
  
      return savedLeads;
    } catch (error) {
      console.error("Error processing leads:", error.message);
      throw new Error(error.message || "Failed to process leads");
    }
};

leadService.exportLeads = async (body) => {
    const { leadIds } = body;

    // Validate lead IDs
    if (!leadIds || leadIds.length === 0) {
        throw new Error("No leads selected for exporting.");
    }

    // Fetch leads from the database
    const leads = await Lead.find({ _id: { $in: leadIds } });

    if (!leads || leads.length === 0) {
        throw new Error("No leads found for the provided IDs.");
    }

    // Dynamically extract all unique fields from the leads
    const allFields = new Set();
    leads.forEach((lead) => {
        Object.keys(lead.toObject()).forEach((field) => allFields.add(field));
    });

    // Convert the leads to CSV format
    const fields = Array.from(allFields);
    const parser = new Parser({ fields });
    const csv = parser.parse(leads);

    return csv;
}


leadService.getAllLeads = async () => {
    try {
        const leads = await Lead.find({ deleted_at: null })
            .populate({
                path: 'notes',
                populate: {
                    path: 'createdBy',
                    select: 'firstName lastName email',
                },
            });

        // Filter notes with deleted_at null
        const filteredLeads = leads.map(lead => ({
            ...lead._doc,
            notes: lead.notes.filter(note => note.deleted_at === null),
        }));

        const count = await Lead.countDocuments({ deleted_at: null });

        if (count === 0) {
            return { message: "No leads found.", count: 0, leads: [] };
        }

        return { count, leads: filteredLeads };
    } catch (error) {
        throw new Error("Error fetching leads: " + error.message);
    }
};

leadService.getLeadById = async (leadId) => {
    const lead = await Lead.findOne({_id:leadId,deleted_at: null})
    .populate({
        path: "notes.createdBy",
        select: "firstName lastName email"
    }).lean()
    if(!lead){
        throw new Error("No lead found.")
    }
    lead.notes = lead.notes.filter((note) => !note.deleted_at)
    return lead;
}

leadService.updateLead = async (leadId, data) => {
    const updatedLead = await Lead.findOneAndUpdate({_id:leadId}, data, {new:true})
    if(!updatedLead){
        throw new Error("No lead found, updation failed")
    }
    return updatedLead;
}

leadService.deleteLead = async (leadId) => {
    const deletedLead = await Lead.findOneAndUpdate({_id:leadId}, {deleted_at: new Date()}, {new:true})
    if(!deletedLead){
        throw new Error("No lead found, updation failed")
    }
    return deletedLead;
}
// multiple leads deletion
leadService.deleteMultipleLeads = async (leadIds) => {
    const deletedLeads = await Lead.updateMany(
        { _id: { $in: leadIds } },
        { deleted_at: new Date() }
    );
    if (!deletedLeads) {
        throw new Error("No leads found to delete.");
    }

    return deletedLeads;
}

leadService.addNotesToLead = async (leadId, note) => {
    const updatedLead = await Lead.findOneAndUpdate(
        { _id: leadId, deleted_at: null },
        { $push: { notes: note } }, 
        { new: true } 
    );
    if (!updatedLead) {
        throw new Error("No lead found to update.");
    }

    return updatedLead;
}

leadService.getNotes = async (leadId) => {
    const lead = await Lead.findOne({_id: leadId}).select('notes')
    if(!lead){
        throw new Error("Lead not found")
    }
    const activenotes = lead.notes.filter(note => !note.deleted_at)
    return activenotes
}

leadService.updateNotesToLead = async (leadId, body) => {
    const {noteId, message} = body
    const updatedLead = await Lead.findOneAndUpdate(
        {_id: leadId, "notes._id": noteId, "notes.deleted_at": null},
        {
            $set: {
                "notes.$.message": message,
                "notes.$.lastUpdatedAt": new Date()
            }
        },
        {new: true}
    )
    
    if (!updatedLead) {
        throw new Error("Lead or note not found.");
    }

    return updatedLead;
}

leadService.deleteNotesToLead = async (leadId, body) => {
    const {noteId} = body
    const updatedLead = await Lead.findOneAndUpdate(
        {_id: leadId, "notes._id": noteId},
        {
            $set: {
                "notes.$.deleted_at": new Date()
            }
        },
        {new: true}
    )
    
    if (!updatedLead) {
        throw new Error("Lead or note not found.");
    }

    return updatedLead;
}

leadService.getExpiredLeadsWithoutUpdatedStatus = async (filterValues) => {
    try {
      const query = {
        deleted_at: null,
      };
  
      if (filterValues) {
        Object.keys(filterValues).forEach((key) => {
          if (filterValues[key]) {
            query[key] = filterValues[key];
          }
        });
      }
  
      const leads = await Lead.find(query).populate({
        path: "notes.createdBy",
        select: "firstName lastName email",
      });
  
      const today = new Date();
      const validStatuses = ["contacted", "qualified", "converted","not interested", "False Data", "Closed"]; 
  
      const filteredLeads = leads.filter((lead) => {
        const leadDueDate = lead.dueDate ? new Date(lead.dueDate) : null;
        const isPastDue = leadDueDate && leadDueDate < today;
  
        return isPastDue && !validStatuses.includes(lead.status);
      }).map((lead) => ({
        ...lead._doc,
        notes: lead.notes.filter((note) => !note.deleted_at),
      }));
  
      return filteredLeads;
    } catch (error) {
      throw new Error("Error fetching missed leads: " + error.message);
    }
};

module.exports = leadService;
