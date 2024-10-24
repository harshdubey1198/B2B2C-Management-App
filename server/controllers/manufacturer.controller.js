const ManufacturerServices = require('../services/manufacturer.services');
const { createResult } = require('../utils/utills');

const manufacturerController = {};

// CREATE MANUFACTURER
manufacturerController.createManufacturer = async (req, res) => {
    try {
        const newManufacturer = await ManufacturerServices.createManufacturer(req.body);
        return res.status(200).json(createResult("Manufacturer created successfully", newManufacturer));
    } catch (error) {
        console.log('Error creating manufacturer:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET ALL MANUFACTURERS
manufacturerController.getManufacturers = async (req, res) => {
    try {
        const manufacturers = await ManufacturerServices.getManufacturers();
        return res.status(200).json(createResult("Manufacturers fetched successfully", manufacturers));
    } catch (error) {
        console.log('Error fetching manufacturers:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET SINGLE MANUFACTURER
manufacturerController.getManufacturer = async (req, res) => {
    try {
        const manufacturer = await ManufacturerServices.getManufacturer(req.params.id);
        return res.status(200).json(createResult("Manufacturer fetched successfully", manufacturer));
    } catch (error) {
        console.log('Error fetching manufacturer:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// UPDATE MANUFACTURER
manufacturerController.updateManufacturer = async (req, res) => {
    try {
        const updatedManufacturer = await ManufacturerServices.updateManufacturer(req.params.id, req.body);
        return res.status(200).json(createResult("Manufacturer updated successfully", updatedManufacturer));
    } catch (error) {
        console.log('Error updating manufacturer:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// DELETE MANUFACTURER
manufacturerController.deleteManufacturer = async (req, res) => {
    try {
        const deletedManufacturer = await ManufacturerServices.deleteManufacturer(req.params.id);
        return res.status(200).json(createResult("Manufacturer deleted successfully", deletedManufacturer));
    } catch (error) {
        console.log('Error deleting manufacturer:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

module.exports = manufacturerController;
