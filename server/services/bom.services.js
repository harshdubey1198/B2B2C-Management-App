const BOM = require("../schemas/bom.schema");
const InventoryItem = require("../schemas/inventoryItem.schema");

const BomServices = {};

// CREATE BOM
BomServices.createbom = async (body) => {
  const { productName, rawMaterials, firmId, createdBy, manufacturer, brand, type, costPrice, categoryId, subcategoryId, vendor, tax } = body;

  // Validate raw materials exist in Inventory
  for (const material of rawMaterials) {
    const item = await InventoryItem.findById(material.itemId);
    if (!item) {
      throw new Error(`Raw material with ID ${material.itemId} not found`);
    }

    // Validate variants (if applicable)
    if (material.variants && material.variants.length > 0) {
      for (const variant of material.variants) {
        if (!variant.variantId) {
          throw new Error(`Variant ID is required for raw material with ID ${material.itemId}`);
        }
        if (!variant.quantity || variant.quantity <= 0) {
          throw new Error(`Invalid quantity for variant ID ${variant.variantId}`);
        }
      }
    } else {
      if (!material.quantity || material.quantity <= 0) {
        throw new Error(`Quantity is required for raw material with ID ${material.itemId} if no variants are provided`);
      }
    }
  }

  // Create BOM
  const newBOM = new BOM({
    productName,
    rawMaterials,
    manufacturer,
    brand,
    type,
    costPrice,
    categoryId,
    subcategoryId,
    vendor,
    tax,
    firmId,
    createdBy,
    status: "created",
    notes: [],
    deleted_at: null,
  });

  await newBOM.save();
  return newBOM;
};

BomServices.getboms = async (body) => {
  const { firmId} = body;
  const data = await BOM.find({ firmId, deleted_at: null })
    .populate({ path: "rawMaterials.itemId", select: "name quantity costPrice" })
    .populate({ path: "manufacturer", select: "name" })
    .populate({ path: "brand", select: "name" })
    .populate({ path: "vendor", select: "name" })
    .populate({ path: "categoryId", select: "name" })
    .populate({ path: "subcategoryId", select: "name" })
    .populate({ path: "firmId", select: "email companyTitle" })
    .populate({ path: "createdBy", select: "firstName lastName email" });

  if (!data.length) {
    throw new Error("No BOMs found for this Firm");
  }
  return data;
};

BomServices.getbomById = async (bomId) => {
  const data = await BOM.findOne({ _id: bomId, deleted_at: null })
    .populate({ path: "rawMaterials.itemId", select: "name quantity costPrice" })
    .populate({ path: "manufacturer", select: "name" })
    .populate({ path: "brand", select: "name" })
    .populate({ path: "vendor", select: "name" })
    .populate({ path: "categoryId", select: "name" })
    .populate({ path: "subcategoryId", select: "name" })
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
    .populate({ path: "rawMaterials.itemId", select: "name quantity costPrice" })
    .populate({ path: "manufacturer", select: "name" })
    .populate({ path: "brand", select: "name" })
    .populate({ path: "vendor", select: "name" })
    .populate({ path: "categoryId", select: "name" })
    .populate({ path: "subcategoryId", select: "name" })
    .populate({ path: "firmId", select: "email companyTitle" })
    .populate({ path: "createdBy", select: "firstName lastName email" });

  if (!updatedBOM) {
    throw new Error("BOM not found");
  }

  return updatedBOM;
};

// Update BOM (excluding status changes)
BomServices.updatebomStatus = async (bomId, data) => {
  const { status, note } = data;

  if (!status || !note) {
    throw new Error("Both status and note are required.");
  }

  const bom = await BOM.findById(bomId);
  if (!bom) {
    throw new Error("BOM not found.");
  }

  bom.status = status;
  bom.notes.push(note); // Add the note to the array

  const updatedBom = await bom.save();
  return updatedBom;
};

// DELETE VENDOR
BomServices.deletebom = async (bomId) => {
  const existingbom = await BOM.findOne({ _id: bomId, deleted_at: null });
  if (!existingbom) {
    throw new Error("BOM does not exist");
  }

  const deletedbom = await BOM.findOneAndUpdate(
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
