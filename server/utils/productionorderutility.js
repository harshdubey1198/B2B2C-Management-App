const InventoryItem = require("../schemas/inventoryItem.schema");
const ProductionOrder = require("../schemas/productionorder.shcema");
const WastageInventory = require("../schemas/wasteinventory.schema");


// calculate price for bom
const calculateBomRawMaterialsCost = async (rawMaterials) => {
  const itemIds = rawMaterials.map(material => material.itemId);
  const inventoryItems = await InventoryItem.find({ _id: { $in: itemIds } });
  const inventoryMap = new Map(inventoryItems.map((item) => [item._id.toString(), item]));

  let totalCost = 0;

  for (const material of rawMaterials) {
    const {
      itemId,
      quantity: materialQuantity = 0,
      wastePercentage = 0,
      variants = []
    } = material;

    const inventoryItem = inventoryMap.get(itemId.toString());

    if (!inventoryItem) {
      throw new Error(`Raw material with ID ${itemId} not found in the inventory.`);
    }

    const costPricePerUnit = inventoryItem.costPrice || 0;
    if (costPricePerUnit === 0) {
      console.warn(`Skipping material with ID ${itemId} due to zero cost price.`);
      continue;
    }

    let materialCost = 0;
    let wastageCost = 0;

    if (variants.length > 0) {
      for (const variant of variants) {
        const variantQuantity = variant.quantity || 0;
        const variantWastePercentage = variant.wastePercentage || 0;
        if (variantQuantity === 0) {
          console.warn(`Skipping variant with ID ${variant.variantId} due to zero quantity.`);
          continue;
        }
        const variantCost = variantQuantity * costPricePerUnit;
        const variantWastageCost = variantQuantity * costPricePerUnit * (variantWastePercentage / 100);
        materialCost += variantCost;
        wastageCost += variantWastageCost;
      }
    } else {
      if (materialQuantity === 0) {
        console.warn(`Skipping material with ID ${itemId} due to zero quantity.`);
        continue;
      }
      materialCost = materialQuantity * costPricePerUnit;
      wastageCost = materialQuantity * costPricePerUnit * (wastePercentage / 100);
    }
    totalCost += materialCost + wastageCost;
  }

  return totalCost;
};

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

const calculateRawMaterials = (bom, productionQuantity) => {
    return bom.rawMaterials.map((material, index) => {

        const wastePercentage = material.wastePercentage !== undefined 
            ? Number(material.wastePercentage) 
            : 0;

        // Calculate item-level quantity
        const materialQuantity = parseFloat((material.quantity * productionQuantity).toFixed(4));

        // Calculate variant-level wastage and total variant wastage
        const variants = material.variants.map((variant, variantIndex) => {
            const variantWastePercentage = variant.wastePercentage !== undefined
                ? Number(variant.wastePercentage)
                : 0;

            const variantWastageQuantity = parseFloat(
                ((variant.quantity * productionQuantity * variantWastePercentage) / 100).toFixed(4)
            );

            return {
                variantId: variant.variantId,
                optionLabel: variant.optionLabel,
                quantity: parseFloat((variant.quantity * productionQuantity).toFixed(4)),
                wastePercentage: variantWastePercentage,
                wastageQuantity: variantWastageQuantity,
            };
        });

        // Sum up variant wastage if variants exist
        const totalVariantWastage = variants.reduce(
            (sum, variant) => sum + variant.wastageQuantity, 0
        );

        // Calculate item-level wastage only if no variants exist
        const materialWastageQuantity = material.variants.length === 0
            ? parseFloat(
                ((materialQuantity * wastePercentage) / 100).toFixed(4)
              )
            : totalVariantWastage;

        return {
            itemId: material.itemId,
            quantity: materialQuantity,
            wastePercentage,
            wastageQuantity: materialWastageQuantity, 
            variants, 
        };
    });
};

// CALCULATE RAW MATERIAL COST 
const calculateRawMaterialsCost = async (rawMaterials, session) => {
  const itemIds = rawMaterials.map(material => material.itemId);
  const inventoryItems = await InventoryItem.find({ _id: { $in: itemIds } }).session(session);
  const inventoryMap = new Map(inventoryItems.map((item) => [item._id.toString(), item]));
  let totalCost = 0;
  for (const material of rawMaterials) {
    const {
      itemId,
      quantity: materialQuantity = 0,
      wastePercentage = 0,
    } = material;

    const inventoryItem = inventoryMap.get(itemId.toString());

    if (!inventoryItem) {
      throw new Error(`Raw material with ID ${itemId} not found in the inventory.`);
    }

    const costPricePerUnit = inventoryItem.costPrice || 0;

    // Skip calculation if materialQuantity or costPricePerUnit is 0
    if (materialQuantity === 0 || costPricePerUnit === 0) {
      console.warn(`Skipping material with ID ${itemId} due to zero quantity or cost price.`);
      continue;
    }

    const materialCost = materialQuantity * costPricePerUnit;
    const wastageCost = materialQuantity * costPricePerUnit * (wastePercentage / 100);

    totalCost += materialCost + wastageCost;
  }
  return totalCost;
}

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

const adjustInventoryStock = async (oldRawMaterials, newRawMaterials, session) => {
    for (const newMaterial of newRawMaterials) {
      const inventoryItem = await InventoryItem.findById(newMaterial.itemId).session(session);
      if (!inventoryItem) {
        throw new Error(`Raw material with ID ${newMaterial.itemId} not found.`);
      }
  
      const oldMaterial = oldRawMaterials.find(
        (rm) => String(rm.itemId) === String(newMaterial.itemId)
      );
  
      const oldRequired = oldMaterial?.quantity || 0;
      const newRequired = newMaterial.quantity;
      const difference = newRequired - oldRequired;
  
      if (newMaterial.variants && newMaterial.variants.length > 0) {
        // Handle variants
        for (const variant of newMaterial.variants) {
          const matchingVariant = inventoryItem.variants.find(
            (v) => String(v._id) === String(variant.variantId)
          );
  
          if (!matchingVariant) {
            throw new Error(`Variant with ID ${variant.variantId} not found for item ${inventoryItem.name}`);
          }
  
          const oldVariant = oldMaterial?.variants.find(
            (v) => String(v.variantId) === String(variant.variantId)
          );
          const oldVariantRequired = oldVariant?.quantity || 0;
          const variantDifference = variant.quantity - oldVariantRequired;
  
          adjustStock(matchingVariant, variantDifference, variant.optionLabel);
        }
  
        // Sync parent item stock with variants
        inventoryItem.quantity = inventoryItem.variants.reduce(
          (sum, v) => sum + v.stock,0
        );
      } else {
        // Handle item without variants
        adjustStock(inventoryItem, difference, inventoryItem.name);
      }
      await inventoryItem.save();
    }
}
  
const adjustStock = async (item, difference, itemName) => {
    if (difference > 0) {
      // Deduct stock
      if (item.stock < difference) {
        throw new Error(`Insufficient stock for ${itemName}. Required: ${difference}, Available: ${item.stock}`);
      }
      item.stock -= difference;
    } else {
      // Add stock
      item.stock += Math.abs(difference);
    }
}

// Export all utility functions
module.exports = {
    generateProductionOrderNumber,
    calculateRawMaterials,
    calculateRawMaterialsCost,
    validateRawMaterials,
    deductRawMaterials,
    adjustInventoryStock,
    calculateBomRawMaterialsCost,
    adjustStock,
};
