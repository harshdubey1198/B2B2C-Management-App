const inventoryServices = require('../services/inventory.services');
const { createResult } = require('../utils/utills');

const inventoryController = {};

// CREATE INVENTORY ITEM WITH VARIANTS
inventoryController.createItem = async (req, res) => {
    try {
        const newItem = await inventoryServices.createItem(req.params.id, req.body);
        return res.status(200).json(createResult("Inventory item created successfully", newItem));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET ALL ITEMS WITH VARIANTS
inventoryController.getAllItems = async (req, res) => {
    try {
        const items = await inventoryServices.getAllItems(req.params.id);
        return res.status(200).json(createResult("Inventory items fetched successfully", items));
    } catch (error) {
        return res.status(500).json(createResult(null, null, error.message));
    }
};

// GET SINGLE ITEM
inventoryController.getItem = async (req, res) => {
    try {
        const items = await inventoryServices.getItem(req.params.id);
        return res.status(200).json(createResult("Inventory items fetched successfully", items));
    } catch (error) {
        return res.status(500).json(createResult(null, null, error.message));
    }
};

// UPDATE ITEM
inventoryController.updateItem = async (req, res) => {
    try {
        const updatedItem = await inventoryServices.updateItem(req.params.id, req.body);
        return res.status(200).json(createResult("Inventory item updated successfully", updatedItem));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// DELETE ITEM
inventoryController.deleteItem = async (req, res) => {
    try {
        const deletedItem = await inventoryServices.deleteItem(req.params.id);
        return res.status(200).json(createResult("Inventory item deleted successfully", deletedItem));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// // GET CATEGORY BASED VARIANTS
// inventoryController.getCategoryVariants = async (req, res) => {
//     try {
//         const categoryVariants = await inventoryServices.getCategoryVariants(req.params.id);
//         return res.status(200).json(createResult("Category Based Variants Fetch successfully", categoryVariants));
//     } catch (error) {
//         return res.status(400).json(createResult(null, null, error.message));
//     }
// };

// // CREATE CATEGORY BASED VARIANTS 
// inventoryController.createCategoryVariants = async (req, res) => {
//     try {
//         const categoryVariants = await inventoryServices.createCategoryVariants(req.body);
//         return res.status(200).json(createResult("Category Based Variants Fetch successfully", categoryVariants));
//     } catch (error) {
//         return res.status(400).json(createResult(null, null, error.message));
//     }
// };

module.exports = inventoryController;
