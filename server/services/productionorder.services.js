const { default: mongoose } = require("mongoose");
const BOM = require("../schemas/bom.schema");
const InventoryItem = require("../schemas/inventoryItem.schema");
const ProductionOrder = require("../schemas/productionorder.shcema");
const { calculateRawMaterials, generateProductionOrderNumber, deductRawMaterials, validateRawMaterials } = require("../utils/productionorderutility");

const ProductionOrderServices = {};

// ProductionOrderServices.createProductionOrder = async (body) => {
//     const { bomId, quantity, firmId, createdBy } = body;

//     const bom = await BOM.findById(bomId);
//     if (!bom) throw new Error('BOM not found');

//     // Validate raw materials
//     for (const material of bom.rawMaterials) {
//         const inventoryItem = await InventoryItem.findById(material.itemId);
//         if (!inventoryItem) {
//             throw new Error(`Raw material with ID ${material.itemId} not found`);
//         }
//         const requiredQuantity = material.quantity * quantity;
//         if (inventoryItem.quantity < requiredQuantity) {
//             throw new Error(`Insufficient stock for ${inventoryItem.name}. Required: ${requiredQuantity}, Available: ${inventoryItem.quantity}`);
//         }
//     }

//     // Calculate total raw material requirements
//     const rawMaterials = calculateRawMaterials(bom, quantity);

//     // Generate production order number
//     const productionOrderNumber = await generateProductionOrderNumber(firmId);

//     const newProductionOrder = new ProductionOrder({
//         productionOrderNumber,
//         bomId,
//         quantity,
//         rawMaterials,
//         firmId,
//         createdBy,
//         status: 'created',
//     });

//     await newProductionOrder.save();
//     return newProductionOrder;
// };

// Create Production Order with Transaction
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

        // Calculate raw materials
        const rawMaterials = calculateRawMaterials(bom, quantity);

        // Validate raw materials
        await validateRawMaterials(rawMaterials, session);

        // Deduct raw materials from inventory
        await deductRawMaterials(rawMaterials, session);

        // Generate production order number
        const productionOrderNumber = await generateProductionOrderNumber(firmId);

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

        const newProductionOrder = await ProductionOrder.create([productionOrderData], { session });

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        return newProductionOrder;
    } catch (error) {
        // Rollback transaction
        await session.abortTransaction();
        session.endSession();
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

// UPDATE PRODUCTION ORDER
ProductionOrderServices.updateProductionOrder = async (id, body) => {
    const { quantity, ...otherFields } = body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find the existing production order
        const existingOrder = await ProductionOrder.findById(id).populate('bomId').session(session);
        if (!existingOrder) {
            throw new Error('Production Order not found');
        } 
 
        
        const { bomId, quantity: existingQuantity } = existingOrder;

        // Ensure status allows updates
        if (existingOrder.status !== 'created') {
            throw new Error('Quantity can only be updated when the status is "created".');
        }

        // Fetch BOM
        const bom = await BOM.findById(bomId).session(session);
        if (!bom) {
            throw new Error('BOM not found');
        }

        // Calculate raw materials for the new quantity
        const newRawMaterials = calculateRawMaterials(bom, quantity);

        // Adjust inventory for each raw material
        for (const newMaterial of newRawMaterials) {
            const inventoryItem = await InventoryItem.findById(newMaterial.itemId).session(session);
            if (!inventoryItem) {
                throw new Error(`Raw material with ID ${newMaterial.itemId} not found`);
            }

            // Find corresponding existing material
            const existingMaterial = existingOrder.rawMaterials.find(
                (rm) => String(rm.itemId._id || rm.itemId) === String(newMaterial.itemId)
            );

            const previouslyDeducted = existingMaterial?.quantity || 0;
            const newRequiredQuantity = newMaterial.quantity;

            // Adjust inventory
            const difference = newRequiredQuantity - previouslyDeducted;
            if (difference > 0) {
                // Deduct additional quantity
                if (inventoryItem.quantity < difference) {
                    throw new Error(
                        `Insufficient stock for ${inventoryItem.name}. Required: ${difference}, Available: ${inventoryItem.quantity}`
                    );
                }
                inventoryItem.quantity -= difference;
            } else if (difference < 0) {
                // Return excess quantity
                inventoryItem.quantity += Math.abs(difference);
            }

            await inventoryItem.save();
        }

        // Update rawMaterials in the production order
        otherFields.rawMaterials = newRawMaterials;

        // Update the production order
        const updatedOrder = await ProductionOrder.findOneAndUpdate(
            { _id: id },
            { ...otherFields, quantity },
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



// ProductionOrderServices.updateProductionOrder = async (id, body) => {
//     const { quantity, ...otherFields } = body;

//     // Find the existing production order
//     const existingOrder = await ProductionOrder.findById(id).populate('bomId');
//     if (!existingOrder) {
//         throw new Error('Production Order not found');
//     }

//     const { bomId, quantity: existingQuantity } = existingOrder;

//     // Handle quantity update
//     if (quantity && quantity !== existingQuantity) {
//         if (existingOrder.status !== 'created') {
//             throw new Error('Quantity can only be updated when the status is "created".');
//         }

//         // Fetch BOM to calculate raw materials
//         const bom = await BOM.findById(bomId);
//         if (!bom) {
//             throw new Error('BOM not found');
//         }

//         // Calculate new raw materials required
//         const newRawMaterials = calculateRawMaterials(bom, quantity);

//         // Calculate existing raw materials (already deducted)
//         const existingRawMaterials = calculateRawMaterials(bom, existingQuantity);

//         // Validate and adjust inventory for the delta
//         for (const newMaterial of newRawMaterials) {
//             const inventoryItem = await InventoryItem.findById(newMaterial.itemId);
//             if (!inventoryItem) {
//                 throw new Error(`Raw material with ID ${newMaterial.itemId} not found`);
//             }

//             // Find the corresponding existing material
//             const existingMaterial = existingRawMaterials.find(
//                 (rm) => String(rm.itemId) === String(newMaterial.itemId)
//             );

//             // Calculate the difference in quantity
//             const deltaQuantity = newMaterial.quantity - (existingMaterial?.quantity || 0);

//             if (deltaQuantity > 0) {
//                 // Deduct additional quantity from inventory
//                 if (inventoryItem.quantity < deltaQuantity) {
//                     throw new Error(
//                         `Insufficient stock for ${inventoryItem.name}. Required: ${deltaQuantity}, Available: ${inventoryItem.quantity}`
//                     );
//                 }
//                 inventoryItem.quantity -= deltaQuantity;
//                 console.log(`Deducted ${deltaQuantity} from inventory.`);
//             } else if (deltaQuantity < 0) {
//                 // Add excess quantity back to inventory
//                 inventoryItem.quantity += Math.abs(deltaQuantity);
//                 console.log(`Returned ${Math.abs(deltaQuantity)} to inventory.`);
//             }

//             // Save updated inventory
//             await inventoryItem.save();
//             console.log(`Inventory updated: ${inventoryItem.name}, New Quantity: ${inventoryItem.quantity}`);
//         }

//         // Update the rawMaterials array in the production order
//         otherFields.rawMaterials = newRawMaterials;
//     }

//     // Update the production order
//     const updatedOrder = await ProductionOrder.findOneAndUpdate(
//         { _id: id },
//         { ...otherFields, quantity },
//         { new: true }
//     )
//         .populate('bomId', 'productName')
//         .populate('rawMaterials.itemId', 'name')
//         .populate('firmId', 'email companyTitle')
//         .populate('createdBy', 'firstName lastName email');
//     return updatedOrder;
// };


// UPDATE STATUS 
ProductionOrderServices.updateProductionOrderStatus = async (id, body) => {
    const { status, notes } = body;

    // Fetch the production order
    const order = await ProductionOrder.findById(id).populate('rawMaterials.itemId');
    if (!order) {
        throw new Error('Production Order not found');
    }

    // Validate the status transition
    const allowedTransitions = {
        created: ['in_progress', 'cancelled'],
        in_progress: ['completed', 'cancelled'],
        completed: [],
        cancelled: []
    };

    if (!allowedTransitions[order.status].includes(status)) {
        throw new Error(`Invalid status transition from ${order.status} to ${status}`);
    }

    // Handle inventory adjustments
    if (status === 'in_progress') {
        // Deduct raw materials from inventory
        for (const material of order.rawMaterials) {
            const inventoryItem = await InventoryItem.findById(material.itemId);
            if (!inventoryItem) {
                throw new Error(`Raw material with ID ${material.itemId} not found`);
            }
            if (inventoryItem.quantity < material.quantity) {
                throw new Error(
                    `Insufficient stock for ${inventoryItem.name}. Required: ${material.quantity}, Available: ${inventoryItem.quantity}`
                );
            }
            inventoryItem.quantity -= material.quantity;
            await inventoryItem.save();
        }
    } else if (status === 'cancelled') {
        // Return raw materials to inventory
        for (const material of order.rawMaterials) {
            const inventoryItem = await InventoryItem.findById(material.itemId);
            if (!inventoryItem) {
                throw new Error(`Raw material with ID ${material.itemId} not found`);
            }
            inventoryItem.quantity += material.quantity;
            await inventoryItem.save();
        }
    }

    // Update the production order status and notes
    order.status = status;
    order.notes = notes || order.notes;
    await order.save();

    return order;
};

module.exports = ProductionOrderServices;