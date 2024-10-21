const VendorServices = require('../services/vendor.services');
const { createResult } = require('../utils/utills');

const vendorController = {};

// CREATE VENDOR
vendorController.createVendor = async (req, res) => {
    try {
        const newVendor = await VendorServices.createVendor(req.params.id, req.body);
        return res.status(200).json(createResult("Vendor created successfully", newVendor));
    } catch (error) {
        console.log('Error creating vendor:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET ALL VENDORS UNDER FIRMS
vendorController.getVendors = async (req, res) => {
    try {
        const vendors = await VendorServices.getVendors(req.params.id);
        return res.status(200).json(createResult("Vendors fetched successfully", vendors));
    } catch (error) {
        console.log('Error fetching vendors:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET SINGLE VENDOR
vendorController.getVendor = async (req, res) => {
    try {
        const vendor = await VendorServices.getVendor(req.params.id);
        return res.status(200).json(createResult("Vendor fetched successfully", vendor));
    } catch (error) {
        console.log('Error fetching vendor:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// UPDATE VENDOR
vendorController.updateVendor = async (req, res) => {
    try {
        const updatedVendor = await VendorServices.updateVendor(req.params.id, req.body);
        return res.status(200).json(createResult("Vendor updated successfully", updatedVendor));
    } catch (error) {
        console.log('Error updating vendor:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// DELETE VENDOR
vendorController.deleteVendor = async (req, res) => {
    try {
        const deletedVendor = await VendorServices.deleteVendor(req.params.id);
        return res.status(200).json(createResult("Vendor deleted successfully", deletedVendor));
    } catch (error) {
        console.log('Error deleting vendor:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

module.exports = vendorController;
