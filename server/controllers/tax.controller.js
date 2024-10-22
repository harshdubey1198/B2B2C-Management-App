const TaxServices = require('../services/tax.services');
const { createResult } = require('../utils/utills');

const taxController = {};

// CREATE TAX
taxController.createTax = async (req, res) => {
    try {
        const newTax = await TaxServices.createTax(req.params.id, req.body);
        return res.status(200).json(createResult("Tax created successfully", newTax));
    } catch (error) {
        console.log('Error creating tax:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET ALL TAXES
taxController.getAllTaxes = async (req, res) => {
    try {
        const taxes = await TaxServices.getAllTaxes(req.params.id);
        return res.status(200).json(createResult("Taxes fetched successfully", taxes));
    } catch (error) {
        console.log('Error fetching taxes:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET TAX BY ID
taxController.getTaxById = async (req, res) => {
    try {
        const tax = await TaxServices.getTaxById(req.params.id);
        return res.status(200).json(createResult("Tax fetched successfully", tax));
    } catch (error) {
        console.log('Error fetching tax:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// UPDATE TAX
taxController.updateTax = async (req, res) => {
    try {
        const updatedTax = await TaxServices.updateTax(req.body);
        return res.status(200).json(createResult("Tax updated successfully", updatedTax));
    } catch (error) {
        console.log('Error updating tax:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// SOFT DELETE TAX
taxController.deleteTax = async (req, res) => {
    try {
        const deletedTax = await TaxServices.deleteTax(req.params.id);
        return res.status(200).json(createResult("Tax deleted successfully", deletedTax));
    } catch (error) {
        console.log('Error deleting tax:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

module.exports = taxController;
