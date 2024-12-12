const Lead = require("../schemas/lead.schema");

const leadService = {};

leadService.createLead = async (body) => {
  const {firstName, lastName, email, mobileNumber, adId, adName, adSetId, campaignId, formId, formName, isOrganic, platform, phoneNumber, lastQualification, yearOfPassout, status,} = body;

  // Validate required fields manually
//   if (!firstName || !lastName || !email || !mobileNumber) {
//     throw new Error(
//       "Missing required fields: firstName, lastName, email, or mobileNumber."
//     );
//   }

//   // Check for duplicate leads by email
//   const existingLead = await Lead.findOne({ email: email });
//   if (existingLead) {
//     throw new Error("Lead with this email already exists.");
//   }

  // Create and save a new lead
  const newLead = new Lead(
    // firstName,
    // lastName,
    // email,
    // mobileNumber,
    // adId,
    // adName,
    // adSetId,
    // campaignId,
    // formId,
    // formName,
    // isOrganic,
    // platform,
    // phoneNumber,
    // lastQualification,
    // yearOfPassout,
    // status,
    body
  );

  await newLead.save();
  return newLead;
};

// leadService.getAllLeads = async () => {
//     const leads = await Lead.find()
//     if(leads.length === 0){
//         return {message: "No leads found."}
//     }
//     return leads;
// }

leadService.getAllLeads = async () => {
    // const result = await Lead.aggregate([
    //     { $facet: {
    //         data: [ { $match: { deleted_at: null } } ], 
    //         count: [ 
    //             { $match: { deleted_at: null } },
    //             { $count: "total" } 
    //         ] 
    //     }}
    // ]);

    // const leads = result[0].data;
    // const count = result[0].count.length > 0 ? result[0].count[0].total : 0;

    // if (count === 0) {
    //     return { message: "No leads found.", count: 0, leads: [] };
    // }

    // return { count, leads };
    try {
        const leads = await Lead.find({ deleted_at: null })
            .populate({
                path: 'notes.createdBy', 
                select: 'firstName lastName email' 
            });
        const count = await Lead.countDocuments({ deleted_at: null });

        if (count === 0) {
            return { message: "No leads found.", count: 0, leads: [] };
        }

        return { count, leads };
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

module.exports = leadService;
