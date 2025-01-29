const WasteManagement = require("../schemas/wasteinventory.schema");

const wasteManagmentServices = {};

wasteManagmentServices.getwasteManagments = async (firmId) => {
    const data = await WasteManagement.find({firmId: firmId, deleted_at: null})
    .populate("productionOrderId")
    .populate({ path: "rawMaterials.itemId" })
    .populate({ path: "firmId", select: "email companyTitle" })
    .populate({ path: "createdBy", select: "firstName lastName email" });

    if(data.length === 0){
        throw new Error('There is no wasteManagment for this Firms!')
    }
    return data
}

wasteManagmentServices.getwasteManagmentById = async (wasteManagmentId) => {
    const wasteManagment = await WasteManagement.findOne({_id: wasteManagmentId, deleted_at: null})
    .populate("productionOrderId")
    .populate({ path: "rawMaterials.itemId" })
    .populate({ path: "firmId", select: "email companyTitle" })
    .populate({ path: "createdBy", select: "firstName lastName email" });
    if(!wasteManagment){
        throw new Error('wasteManagment not Found')
    }
    return wasteManagment
}

module.exports = wasteManagmentServices