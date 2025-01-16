const BOM = require("../schemas/bom.schema");
const ProductionOrder = require("../schemas/productionorder.shcema");
const { calculateRawMaterials, generateProductionOrderNumber } = require("../utils/productionorderutility");

const ProductionOrderServices = {};

ProductionOrderServices.createProductionOrder = async (body) => {
    const { bomId, quantity, firmId, createdBy } = body;

    const bom = await BOM.findById(bomId);
    if (!bom) throw new Error('BOM not found');

    // Calculate total raw material requirements
    const rawMaterials = calculateRawMaterials(bom, quantity);

    // Generate production order number
    const productionOrderNumber = await generateProductionOrderNumber(firmId);

    const newProductionOrder = new ProductionOrder({
        productionOrderNumber,
        bomId,
        quantity,
        rawMaterials,
        firmId,
        createdBy,
        status: 'created',
    });

    await newProductionOrder.save();
    return newProductionOrder;
};

module.exports = ProductionOrderServices;
