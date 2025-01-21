const RawMaterialsInventory = require("../schemas/rawinventory.schema");

const RawMaterialsInventoryServices = {};

// Create Raw Material
RawMaterialsInventoryServices.createRawMaterial = async (body) => {
    const { name, description, quantity, qtyType, costPrice, sellingPrice, reorderLevel, vendor, tax, brand, categoryId, subcategoryId, variants, createdBy, firmId } = body;

    // Check if the raw material already exists (optional)
    const existingMaterial = await RawMaterialsInventory.findOne({ name: name, firmId: firmId });
    if (existingMaterial) {
        throw new Error('Raw material with this name already exists for this firm');
    }

    // Create new raw material
    const newRawMaterial = new RawMaterialsInventory({
        name,
        description,
        quantity,
        qtyType,
        costPrice,
        sellingPrice,
        reorderLevel,
        vendor,
        tax,
        brand,
        categoryId,
        subcategoryId,
        variants,
        createdBy,
        firmId
    });

    await newRawMaterial.save();
    return newRawMaterial;
};

// Get All Raw Materials
RawMaterialsInventoryServices.getRawMaterials = async (query) => {
    const { firmId } = query;
    const rawMaterials = await RawMaterialsInventory.find({ firmId, deleted_at: null })
        .populate('vendor', 'name email')
        .populate('tax.taxId', 'taxType rate')
        .populate('brand', 'name')
        .populate('categoryId', 'name')
        .populate('subcategoryId', 'name')
        .populate('firmId', 'companyTitle email')
        .populate('createdBy', 'firstName lastName email');

    if (rawMaterials.length === 0) {
        throw new Error('No raw materials found for this firm');
    }

    return rawMaterials;
};

// Get Single Raw Material By ID
RawMaterialsInventoryServices.getRawMaterialById = async (id) => {
    const rawMaterial = await RawMaterialsInventory.findOne({ _id: id, deleted_at: null })
        .populate('vendor', 'name email')
        .populate('tax.taxId', 'taxType rate')
        .populate('brand', 'name')
        .populate('categoryId', 'name')
        .populate('subcategoryId', 'name')
        .populate('firmId', 'companyTitle email')
        .populate('createdBy', 'firstName lastName email');

    if (!rawMaterial) {
        throw new Error('Raw material not found');
    }

    return rawMaterial;
};

// Update Raw Material
RawMaterialsInventoryServices.updateRawMaterial = async (id, body) => {
    const updatedMaterial = await RawMaterialsInventory.findByIdAndUpdate(id, body, { new: true })
        .populate('vendor', 'name email')
        .populate('tax.taxId', 'taxType rate')
        .populate('brand', 'name')
        .populate('categoryId', 'name')
        .populate('subcategoryId', 'name')
        .populate('firmId', 'companyTitle email')
        .populate('createdBy', 'firstName lastName email');

    if (!updatedMaterial) {
        throw new Error('Raw material not found');
    }

    return updatedMaterial;
};

// Delete Raw Material
RawMaterialsInventoryServices.deleteRawMaterial = async (id) => {
    const material = await RawMaterialsInventory.findById(id);
    if (!material) {
        throw new Error('Raw material not found');
    }

    material.deleted_at = new Date();
    await material.save();

    return material;
};

module.exports = RawMaterialsInventoryServices;
