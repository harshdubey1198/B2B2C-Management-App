const { default: mongoose } = require("mongoose");
const BOM = require("../schemas/bom.schema");
const InventoryItem = require("../schemas/inventoryItem.schema");
const ProductionOrder = require("../schemas/productionorder.shcema");
const WasteManagement = require("../schemas/wasteinventory.schema");
const { calculateRawMaterials, generateProductionOrderNumber, deductRawMaterials, validateRawMaterials } = require("../utils/productionorderutility");

const ProductionOrderServices = {};

ProductionOrderServices.createProductionOrder = async (body) => {
    const { bomId, quantity, firmId, createdBy } = body;
    if (!bomId || !quantity || !firmId || !createdBy) {
        throw new Error("Missing required fields: bomId, quantity, firmId, or createdBy");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Fetch BOM
        const bom = await BOM.findById(bomId).session(session);
        if (!bom) {
            throw new Error("BOM not found.");
        }
        // console.log("Fetched BOM:", JSON.stringify(bom, null, 2));

        // Calculate raw materials
        const rawMaterials = calculateRawMaterials(bom, quantity);
        console.log("Calculated Raw Materials:", JSON.stringify(rawMaterials, null, 2));

        let totalWastage = [];
        let adjustedProductionQuantity = quantity;

        // Calculate wastage and adjust production quantity
        for (const material of rawMaterials) {
            totalWastage.push({
                itemId: material.itemId,
                wasteQuantity: material.wastageQuantity, // Correct wastage value
                reason: "Production wastage",
            });
        
            for (const variant of material.variants) {
                totalWastage.push({
                    itemId: material.itemId,
                    wasteQuantity: variant.wastageQuantity, // Variant wastage value
                    reason: `Variant ${variant.optionLabel} wastage`,
                });
            }
        }
        console.log("Total Wastage for WasteManagement:", JSON.stringify(totalWastage, null, 2));
        
        console.log("Total Wastage for WasteManagement:", JSON.stringify(totalWastage, null, 2));

        // Validate raw materials
        await validateRawMaterials(rawMaterials, session);
        // console.log("Raw materials validation passed.");

        // Deduct raw materials from inventory
        await deductRawMaterials(rawMaterials, session);
        // console.log("Raw materials deducted from inventory.");

        // Generate production order number
        const productionOrderNumber = await generateProductionOrderNumber(firmId);
        // console.log("Generated Production Order Number:", productionOrderNumber);

        // Create production order
        const productionOrderData = {
            productionOrderNumber,
            bomId,
            quantity,
            rawMaterials,
            firmId,
            createdBy,
            status: "created",
        };
        // console.log("Production Order Data:", JSON.stringify(productionOrderData, null, 2));

        const newProductionOrder = await ProductionOrder.create([productionOrderData], { session });
        // console.log("Created Production Order:", JSON.stringify(newProductionOrder, null, 2));
        
        const wasteManagementData = {
            productionOrderId: newProductionOrder[0]._id,
            firmId,
            createdBy,
            rawMaterials: totalWastage, // Include all raw materials, without filtering
        };
        // console.log("Waste Management Data to Create:", JSON.stringify(wasteManagementData, null, 2));

        await WasteManagement.create([wasteManagementData], { session });
        // console.log("WasteManagement entry created.");

        // Commit transaction
        await session.commitTransaction();
        session.endSession();
        console.log("Transaction committed successfully.");
        return newProductionOrder;
    } catch (error) {
        // Rollback transaction
        await session.abortTransaction();
        session.endSession();
        console.error("Transaction rolled back due to error:", error);
        throw error;
    }
};


// GET PRODUCTIONS
ProductionOrderServices.getProductionOrders = async (body) => {
    const { firmId } = body;
    const data = await ProductionOrder.find({ firmId: firmId, deleted_at: null })
      .populate('bomId', 'productName')
      .populate({ path: "rawMaterials.itemId" }) 
      .populate({ path: "firmId", select: "email companyTitle" }) 
      .populate({ path: "createdBy", select: "firstName lastName email" });
  
    if (data.length === 0) {
      throw new Error("No ProductionOrders found for this Firm");
    }
    return data;
}

// GET PRODUCTION BY ID
ProductionOrderServices.getProductionOrderById = async (id) => {
    const data = await ProductionOrder.find({ _id: id, deleted_at: null })
      .populate('bomId', 'productName')
      .populate({ path: "rawMaterials.itemId" }) 
      .populate({ path: "firmId", select: "email companyTitle" }) 
      .populate({ path: "createdBy", select: "firstName lastName email" });
  
    if (!data) {
      throw new Error("No ProductionOrder found for this Firm");
    }
    return data;
}

ProductionOrderServices.updateProductionOrder = async (id, body) => {
    const { quantity: newQuantity, ...otherFields } = body;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const existingOrder = await ProductionOrder.findById(id).populate('bomId').session(session);
        if (!existingOrder) throw new Error('Production Order not found');

        if (existingOrder.status !== 'created') {
            throw new Error('Quantity can only be updated when the status is "created".');
        }

        const { bomId, quantity: oldQuantity } = existingOrder;
        const bom = await BOM.findById(bomId).session(session);
        if (!bom) throw new Error('BOM not found');

        const oldRawMaterials = calculateRawMaterials(bom, oldQuantity);
        const newRawMaterials = calculateRawMaterials(bom, newQuantity);

        for (const newMaterial of newRawMaterials) {
            const inventoryItem = await InventoryItem.findById(newMaterial.itemId).session(session);
            if (!inventoryItem) throw new Error(`Raw material with ID ${newMaterial.itemId} not found`);

            const oldMaterial = oldRawMaterials.find(
                (rm) => String(rm.itemId) === String(newMaterial.itemId)
            );

            const oldRequired = oldMaterial?.quantity || 0;
            const newRequired = newMaterial.quantity;

            if (newMaterial.variants && newMaterial.variants.length > 0) {
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

                    if (variantDifference > 0) {
                        if (matchingVariant.stock < variantDifference) {
                            throw new Error(
                                `Insufficient stock for variant ${variant.optionLabel}. Required: ${variantDifference}, Available: ${matchingVariant.stock}`
                            );
                        }
                        matchingVariant.stock -= variantDifference;
                    } else {
                        matchingVariant.stock += Math.abs(variantDifference);
                    }
                }

                const totalVariantStock = inventoryItem.variants.reduce((sum, v) => sum + v.stock, 0);
                inventoryItem.quantity = totalVariantStock;
            } else {
                const difference = newRequired - oldRequired;

                if (difference > 0) {
                    if (inventoryItem.quantity < difference) {
                        throw new Error(
                            `Insufficient stock for ${inventoryItem.name}. Required: ${difference}, Available: ${inventoryItem.quantity}`
                        );
                    }
                    inventoryItem.quantity -= difference;
                } else {
                    inventoryItem.quantity += Math.abs(difference);
                }
            }

            await inventoryItem.save();
        }

        otherFields.rawMaterials = newRawMaterials;

        const updatedOrder = await ProductionOrder.findOneAndUpdate(
            { _id: id },
            { ...otherFields, quantity: newQuantity },
            { new: true, session }
        )
            .populate('bomId', 'productName')
            .populate('rawMaterials.itemId', 'name');

        await session.commitTransaction();
        session.endSession();

        return updatedOrder;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

// UPDATE STATUS 
ProductionOrderServices.updateProductionOrderStatus = async (id, body) => {
    const session = await mongoose.startSession();
    session.startTransaction(); 
    try {
        const { status, notes } = body;
        const order = await ProductionOrder.findById(id)
            .populate('rawMaterials.itemId')
            .session(session);
        if (!order) {
            throw new Error('Production Order not found');
        }

        const allowedTransitions = {
            created: ['in_progress', 'cancelled'],
            in_progress: ['completed', 'cancelled'],
            completed: [],
            cancelled: []
        };

        if (!allowedTransitions[order.status].includes(status)) {
            throw new Error(`Invalid status transition from ${order.status} to ${status}`);
        }

        if (status === 'cancelled') {
            for (const material of order.rawMaterials) {
                const inventoryItem = await InventoryItem.findById(material.itemId).session(session);
                if (!inventoryItem) {
                    throw new Error(`Raw material with ID ${material.itemId} not found`);
                }

                if (inventoryItem.variants && inventoryItem.variants.length > 0) {
                    for (const variant of material.variants) {
                        const variantIndex = inventoryItem.variants.findIndex(
                            v => v._id.toString() === variant.variantId
                        );
                        if (variantIndex === -1) {
                            throw new Error(
                                `Variant with ID ${variant.variantId} not found for item ${inventoryItem.name}`
                            );
                        }
                        inventoryItem.variants[variantIndex].stock += variant.quantity;
                    }
                    inventoryItem.quantity = inventoryItem.variants.reduce(
                        (total, variant) => total + variant.stock,
                        0
                    );
                } else {
                    inventoryItem.quantity += material.quantity;
                }
                await inventoryItem.save({ session });
            }
        }

        order.status = status;
        order.notes = notes || order.notes;
        await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        return order;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

module.exports = ProductionOrderServices;