const inventoryServices = require('../services/inventory.services');
const { createResult } = require('../utils/utills')
const inventoryController = {};

// CREATE INVENTORY ITEM WITH VARIANTS
inventoryController.createItem = async (req, res) => {
    try {
        const newItem = await inventoryServices.createItem(req.body);
        return res.status(200).json(createResult("Inventory item created successfully", newItem));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET ALL ITEMS WITH VARIANTS
inventoryController.getItems = async (req, res) => {
    try {
        const items = await inventoryServices.getItems();
        return res.status(200).json(items);
    } catch (error) {
        console.log("Error fetching inventory items:", error);
        return res.status(500).json({ message: error });
    }
};

// UPDATE ITEM
inventoryController.updateItem = async (req, res) => {
    try {
        const updatedItem = await inventoryServices.updateItem(req.params.id, req.body);
        return res.status(200).json({ message: "Inventory Item updated successfully", updatedItem });
    } catch (error) {
        console.log("Error updating inventory item:", error);
        return res.status(500).json({ message: error });
    }
};

// DELETE ITEM
inventoryController.deleteItem = async (req, res) => {
    try {
        const deletedItem = await inventoryServices.deleteItem(req.params.id);
        return res.status(200).json({ message: "Inventory Item deleted successfully", deletedItem });
    } catch (error) {
        console.log("Error deleting inventory item:", error);
        return res.status(500).json({ message: error });
    }
};

module.exports = inventoryController;
