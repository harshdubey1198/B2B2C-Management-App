const InventoryServices = require('../services/inventory.services');

const inventoryController = {};

// CREATE INVENTORY ITEM WITH VARIANTS
inventoryController.createItem = async (req, res) => {
    try {
        const response = await InventoryServices.createItem(req.body);
        return res.status(200).json({ message: "Inventory Item created successfully", response });
    } catch (error) {
        console.log("Error creating inventory item:", error);
        return res.status(500).json({ message: error });
    }
};

// GET ALL ITEMS WITH VARIANTS
inventoryController.getItems = async (req, res) => {
    try {
        const items = await InventoryServices.getItems();
        return res.status(200).json(items);
    } catch (error) {
        console.log("Error fetching inventory items:", error);
        return res.status(500).json({ message: error });
    }
};

// UPDATE ITEM
inventoryController.updateItem = async (req, res) => {
    try {
        const updatedItem = await InventoryServices.updateItem(req.params.id, req.body);
        return res.status(200).json({ message: "Inventory Item updated successfully", updatedItem });
    } catch (error) {
        console.log("Error updating inventory item:", error);
        return res.status(500).json({ message: error });
    }
};

// DELETE ITEM
inventoryController.deleteItem = async (req, res) => {
    try {
        const deletedItem = await InventoryServices.deleteItem(req.params.id);
        return res.status(200).json({ message: "Inventory Item deleted successfully", deletedItem });
    } catch (error) {
        console.log("Error deleting inventory item:", error);
        return res.status(500).json({ message: error });
    }
};

module.exports = inventoryController;
