const BOM = require("../schemas/bom.schema");
const InventoryItem = require("../schemas/inventoryItem.schema");
const Tax = require("../schemas/tax.schema");
const { calculateBomRawMaterialsCost } = require("../utils/productionorderutility");

const BomServices = {};

// CREATE BOM
BomServices.createbom = async (body) => {
  const { 
    productName, rawMaterials, firmId, createdBy, manufacturer, brand, type, 
    sellingPrice, categoryId, subcategoryId, vendor, taxId, selectedTaxTypes 
  } = body;

  const existingBOM = await BOM.findOne({ productName, firmId });
  if (existingBOM) {
    throw new Error(`BOM for product '${productName}' already exists in this firm.`);
  }

  // Validate raw materials exist in Inventory
  for (const material of rawMaterials) {
    const item = await InventoryItem.findById(material.itemId);
    if (!item) {
      throw new Error(`Raw material with ID ${material.itemId} not found`);
    }
  }

  const totalCostPrice = await calculateBomRawMaterialsCost(rawMaterials);

  if (totalCostPrice > sellingPrice) {
    throw new Error("Selling price should not be less than total cost price.");
  }

  //Ensure `tax` is properly fetched and structured
  if (!taxId) {
    throw new Error('Tax is required for BOM creation');
  }
  
  const tax = await Tax.findById(taxId);
  if (!tax) {
    throw new Error(`Tax with ID ${taxId} not found`);
  }

  const taxRateIds = tax.taxRates
    .filter(rate => selectedTaxTypes.includes(rate.taxType)) 
    .map(rate => rate._id.toString()); 

  if (taxRateIds.length === 0) {
    throw new Error('No valid tax components selected');
  }

  const newBOM = new BOM({
    productName,
    rawMaterials,
    manufacturer,
    brand,
    type,
    totalCostPrice,
    sellingPrice,
    categoryId,
    subcategoryId,
    vendor,
    tax: {
      taxId: tax._id,
      selectedTaxTypes: taxRateIds 
    },
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
    .populate({ path: "rawMaterials.itemId", select: "name quantity costPrice qtyType" })
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
