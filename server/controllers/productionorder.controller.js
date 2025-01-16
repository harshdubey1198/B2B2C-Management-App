const ProductionOrderServices = require('../services/productionorder.services');
const { createResult } = require('../utils/utills');

const ProductionOrderController = {};

// CREATE productionorder
ProductionOrderController.createproductionorder = async (req, res) => {
    try {
        const newproductionorder = await ProductionOrderServices.createProductionOrder(req.body);
        return res.status(200).json(createResult("productionorder created successfully", newproductionorder));
    } catch (error) {
        console.log('Error creating productionorder:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET ALL productionorderS
ProductionOrderController.getproductionorders = async (req, res) => {
    try {
        const productionorders = await ProductionOrderServices.getProductionOrders(req.body);
        return res.status(200).json(createResult("productionorders fetched successfully", productionorders));
    } catch (error) {
        console.log('Error fetching productionorders:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET SINGLE productionorder
ProductionOrderController.getproductionorderById = async (req, res) => {
    try {
        const productionorder = await ProductionOrderServices.getProductionOrderById(req.params.id);
        return res.status(200).json(createResult("productionorder fetched successfully", productionorder));
    } catch (error) {
        console.log('Error fetching productionorder:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// UPDATE productionorder
ProductionOrderController.updateproductionorder = async (req, res) => {
    try {
        const updatedproductionorder = await ProductionOrderServices.updateProductionOrder(req.params.id, req.body);
        return res.status(200).json(createResult("productionorder updated successfully", updatedproductionorder));
    } catch (error) {
        console.log('Error updating productionorder:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

ProductionOrderController.updateproductionorderStatus = async (req, res) => {
    try {
        const updatedproductionorderStatus = await ProductionOrderServices.updateProductionOrderStatus(req.params.id, req.body);
        return res.status(200).json(createResult("productionorder status updated successfully", updatedproductionorderStatus));
    } catch (error) {
        console.log('Error updating status of productionorder:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// DELETE productionorder
ProductionOrderController.deleteproductionorder = async (req, res) => {
    try {
        const deletedproductionorder = await ProductionOrderServices.deleteProductionOrder(req.params.id);
        return res.status(200).json(createResult("productionorder deleted successfully", deletedproductionorder));
    } catch (error) {
        console.log('Error deleting productionorder:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

module.exports = ProductionOrderController;
