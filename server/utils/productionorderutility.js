const InventoryItem = require("../schemas/inventoryItem.schema");
const ProductionOrder = require("../schemas/productionorder.shcema");
const WastageInventory = require("../schemas/wasteinventory.schema");


// Generate unique production order number
const generateProductionOrderNumber = async (firmId) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const lastOrder = await ProductionOrder.findOne({ firmId: firmId }).sort({ createdAt: -1 });

    if (lastOrder) {
        const lastOrderParts = lastOrder.productionOrderNumber.split('-');
        const lastOrdrIncrement = parseInt(lastOrderParts[4], 10);
        return `PO-${year}-${month}-${day}-${lastOrdrIncrement + 1}`;
      } else {
        return `PO-${year}-${month}-${day}-1`;
      }
};

// Calculate raw materials based on BOM and production quantity
const calculateRawMaterials = (bom, productionQuantity) => {
    return bom.rawMaterials.map(material => ({
        itemId: material.itemId,
        quantity: material.quantity * productionQuantity,
        wastagePercentage: material.wastagePercentage,
        variants: material.variants.map((variant) => ({
            variantId: variant.variantId,
            optionLabel: variant.optionLabel,
            quantity: variant.quantity * productionQuantity,
            wastagePercentage: variant.wastagePercentage
        }))
    }));
};

// Validate raw materials
const validateRawMaterials = async (rawMaterials, session) => {
    for (const material of rawMaterials) {
        const inventoryItem = await InventoryItem.findById(material.itemId).session(session);
        if (!inventoryItem) {
            throw new Error(`Raw material with ID ${material.itemId} not found.`);
        }

        let totalQuantityRequired = material.quantity;
        for (const variant of material.variants) {
            const matchingVariant = inventoryItem.variants.find((v) => v._id.toString() === variant.variantId.toString());
            if (!matchingVariant) {
                throw new Error(`Variant with ID ${variant.variantId} not found for item ${inventoryItem.name}.`);
            }
            if (matchingVariant.stock < variant.quantity) {
                throw new Error(`Insufficient stock for variant ${variant.optionLabel}. Required: ${variant.quantity}, Available: ${matchingVariant.stock}`);
            }
            totalQuantityRequired -= variant.quantity;
        }
        if (inventoryItem.quantity < totalQuantityRequired) {
            throw new Error(
                `Insufficient stock for ${inventoryItem.name}. Required: ${totalQuantityRequired}, Available: ${inventoryItem.quantity}`
            );
        }
    }
};

const deductRawMaterials = async (rawMaterials, session) => {
    for (const material of rawMaterials) {
        const inventoryItem = await InventoryItem.findById(material.itemId).session(session);
        if (!inventoryItem) {
            throw new Error(`Item with ID ${material.itemId} not found.`);
        }

        if (inventoryItem.variants && inventoryItem.variants.length > 0) {
            for (const variant of material.variants) {
                await InventoryItem.updateOne(
                    { _id: material.itemId, "variants._id": variant.variantId },
                    { $inc: { "variants.$.stock": -variant.quantity } },
                    { session }
                );
            }

            const updatedItem = await InventoryItem.findById(material.itemId).session(session);
            const totalVariantStock = updatedItem.variants.reduce(
                (sum, variant) => sum + variant.stock,
                0
            );

            await InventoryItem.findByIdAndUpdate(
                material.itemId,
                { quantity: totalVariantStock },
                { session }
            );
        } else {
            await InventoryItem.findByIdAndUpdate(
                material.itemId,
                { $inc: { quantity: -material.quantity } },
                { session }
            );
        }
    }
};




// Export all utility functions
module.exports = {
    generateProductionOrderNumber,
    calculateRawMaterials,
    validateRawMaterials,
    deductRawMaterials,
};
