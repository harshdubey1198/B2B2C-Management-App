const ProductionOrder = require("../schemas/productionorder.shcema");

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
    }));
};

// Export all utility functions
module.exports = {
    generateProductionOrderNumber,
    calculateRawMaterials,
};
