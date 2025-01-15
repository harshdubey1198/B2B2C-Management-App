const BOM = require("../schemas/bom.schema");
const bom = require("../schemas/bom.schema");
const InventoryItem = require("../schemas/inventoryItem.schema");
const User = require("../schemas/user.schema");

const BomServices = {};

// CREATE VENDOR
BomServices.createbom = async (body) => {
  const { productName, rawMaterials, wastagePercentage, firmId, createdBy } =
    body;
  for (const material of rawMaterials) {
    const item = await InventoryItem.findById(material.itemId);
    if (!item) {
      throw new Error(`Raw material with ID ${material.itemId} not found`);
    }
  }

  // Create BOM
  const newBOM = new BOM({
    productName,
    rawMaterials,
    wastagePercentage,
    firmId,
    createdBy,
  });

  await newBOM.save();
  return newBOM;
};

BomServices.getboms = async (body) => {
  const { firmId } = body;
  const data = await BOM.find({ firmId: firmId, deleted_at: null })
    .populate({ path: "rawMaterials.itemId" }) 
    .populate({ path: "firmId", select: "email companyTitle" }) 
    .populate({ path: "createdBy", select: "firstName lastName email" });

  if (data.length === 0) {
    throw new Error("No BOMs found for this Firm");
  }
  return data;
};

BomServices.getbomById = async (bomId) => {
  const data = await bom.findOne({ _id: bomId, deleted_at: null })
    .populate({ path: "rawMaterials.itemId" }) 
    .populate({ path: "firmId", select: "email companyTitle" }) 
    .populate({ path: "createdBy", select: "firstName lastName email" });

  if (!data) {
    throw new Error("No BOM found");
  }
  return data;
};

// UPDATE VENDOR
BomServices.updatebom = async (id, body) => {
    const updatedBOM = await BOM.findOneAndUpdate({ _id: id, deleted_at: null }, body, { new: true })
    .populate({ path: 'rawMaterials.itemId' })
    .populate({ path: 'firmId', select: 'email companyTitle' })
    .populate({ path: 'createdBy', select: 'firstName lastName email' });

    if (!updatedBOM) {
        throw new Error('BOM not found');
    }

    return updatedBOM;
};

// Update BOM (excluding status changes)
BomServices.updatebomStatus = async (id, body) => {
    const { status, notes } = body;
    const existingBOM = await BOM.findById(id);
    if (!existingBOM) {
        throw new Error('BOM not found');
    }

    // Handle status updates specifically
    if (status === 'in_progress') {
        // Deduct raw materials from inventory
        for (const material of existingBOM.rawMaterials) {
            const inventoryItem = await InventoryItem.findById(material.itemId);
            if (inventoryItem) {
                const requiredQuantity = material.quantity;
                if (inventoryItem.quantity < requiredQuantity) {
                    throw new Error(`Insufficient stock for ${inventoryItem.name}. Required: ${requiredQuantity}, Available: ${inventoryItem.quantity}`);
                }
                inventoryItem.quantity -= requiredQuantity;
                await inventoryItem.save();
            }
        }
    } else if (status === 'cancelled') {
        // Return raw materials to inventory
        for (const material of existingBOM.rawMaterials) {
            const inventoryItem = await InventoryItem.findById(material.itemId);
            if (inventoryItem) {
                const returnQuantity = material.quantity;
                inventoryItem.quantity += returnQuantity;
                await inventoryItem.save();
            }
        }
    }

    existingBOM.status = status || existingBOM.status;
    existingBOM.notes = notes || existingBOM.notes;
    await existingBOM.save();

    return existingBOM;
};

// DELETE VENDOR
BomServices.deletebom = async (bomId) => {
  const existingbom = await bom.findOne({ _id: bomId, deleted_at: null });
  if (!existingbom) {
    throw new Error("BOM does not exist");
  }

  const deletedbom = await bom.findOneAndUpdate(
    { _id: bomId },
    { deleted_at: new Date() },
    { new: true }
  );
  if (!deletedbom) {
    throw new Error("unable to delete bom");
  }
  return deletedbom;
};

module.exports = BomServices;
