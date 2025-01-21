const RawMaterialsInventoryServices = require('../services/rawinventory.services');
const { createResult } = require('../utils/utills');

const rawMaterialsInventoryController = {};

// CREATE Raw Material
rawMaterialsInventoryController.createRawMaterial = async (req, res) => {
    try {
        const newRawMaterial = await RawMaterialsInventoryServices.createRawMaterial(req.body);
        return res.status(200).json(createResult("Raw material created successfully", newRawMaterial));
    } catch (error) {
        console.log('Error creating raw material:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET ALL Raw Materials
rawMaterialsInventoryController.getRawMaterials = async (req, res) => {
    try {
        const rawMaterials = await RawMaterialsInventoryServices.getRawMaterials(req.body);
        return res.status(200).json(createResult("Raw materials fetched successfully", rawMaterials));
    } catch (error) {
        console.log('Error fetching raw materials:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET SINGLE Raw Material
rawMaterialsInventoryController.getRawMaterialById = async (req, res) => {
    try {
        const rawMaterial = await RawMaterialsInventoryServices.getRawMaterialById(req.params.id);
        return res.status(200).json(createResult("Raw material fetched successfully", rawMaterial));
    } catch (error) {
        console.log('Error fetching raw material:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// UPDATE Raw Material
rawMaterialsInventoryController.updateRawMaterial = async (req, res) => {
    try {
        const updatedRawMaterial = await RawMaterialsInventoryServices.updateRawMaterial(req.params.id, req.body);
        return res.status(200).json(createResult("Raw material updated successfully", updatedRawMaterial));
    } catch (error) {
        console.log('Error updating raw material:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// DELETE Raw Material
rawMaterialsInventoryController.deleteRawMaterial = async (req, res) => {
    try {
        const deletedRawMaterial = await RawMaterialsInventoryServices.deleteRawMaterial(req.params.id);
        return res.status(200).json(createResult("Raw material deleted successfully", deletedRawMaterial));
    } catch (error) {
        console.log('Error deleting raw material:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

module.exports = rawMaterialsInventoryController;
