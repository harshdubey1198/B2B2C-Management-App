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
    const { quantity, ...otherFields } = body;

    // Find the existing production order
    const existingOrder = await ProductionOrder.findById(id).populate('bomId');
    if (!existingOrder) {
        throw new Error('Production Order not found');
    }

    const { bomId, quantity: existingQuantity } = existingOrder;
    // Handle quantity update
    if (quantity && quantity !== existingQuantity) {
        // Fetch BOM to calculate new raw materials
        const bom = await BOM.findById(bomId);
        if (!bom) {
            throw new Error('BOM not found');
        }

        // Calculate new raw materials
        const newRawMaterials = calculateRawMaterials(bom, quantity);

        // Validate and adjust inventory
        for (const newMaterial of newRawMaterials) {
            const inventoryItem = await InventoryItem.findById(newMaterial.itemId);
            if (!inventoryItem) {
                throw new Error(`Raw material with ID ${newMaterial.itemId} not found`);
            }
            // Find the corresponding existing material
            const existingMaterial = existingOrder.rawMaterials.find(
                (rm) => String(rm.itemId) === String(newMaterial.itemId)
            );
            // Calculate the difference in quantity
            const difference = newMaterial.quantity - (existingMaterial?.quantity || 0);
            if (difference > 0) {
                // Deduct additional raw materials
                if (inventoryItem.quantity < difference) {
                    throw new Error(
                        `Insufficient stock for ${inventoryItem.name}. Required: ${difference}, Available: ${inventoryItem.quantity}`
                    );
                }
                inventoryItem.quantity -= difference;
            } else if (difference < 0) {
                // Return excess raw materials
                inventoryItem.quantity += Math.abs(difference);
            }
            // Save updated inventory
            await inventoryItem.save();
        }
        // Update the rawMaterials array in the production order
        otherFields.rawMaterials = newRawMaterials;
    }
   
    // Update the production order
    const updatedOrder = await ProductionOrder.findOneAndUpdate(
        { _id: id },
        { ...otherFields, quantity },
        { new: true }
    )
        .populate('bomId', 'productName')
        .populate('rawMaterials.itemId', 'name')
        .populate('firmId', 'email companyTitle')
        .populate('createdBy', 'firstName lastName email');
    return updatedOrder;
};



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
