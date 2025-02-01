const CustomerServices = require('../services/customer.services');
const { createResult } = require('../utils/utills');

const customerController = {};

// SEARCH CUSTOMER
customerController.searchCustomer = async (req, res) => {
    try {
        const searchQuery = req.query.q
        const firmId = req.query.firmId
        const customer = await CustomerServices.searchCustomer(searchQuery, firmId);
        return res.status(200).json(createResult("Customer Searched Successfully", customer));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET ALL CUSTOMER UNDER SPECIFIC FIRM
customerController.getAllCustomers = async (req, res) => {
    try {
        const customers = await CustomerServices.getAllCustomers(req.params.id);
        return res.status(200).json(createResult("Customers under firm fetched successfully", customers));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};


// GET SINGLE CUSTOMER DATA
customerController.getCustomer = async (req, res) => {
    try {
        const customer = await CustomerServices.getCustomer(req.params.id);
        return res.status(200).json(createResult("Fetched Customer data successfully", customer));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// DELETE CUSTOMER
customerController.deleteCustomer = async (req, res) => {
    try {
        const customer = await CustomerServices.deleteCustomer(req.params.id);
        return res.status(200).json(createResult("Customer deleted successfully", customer));
    } catch (error) {
        console.log(error, "error deleting customer")
        return res.status(400).json(createResult(null, null, error.message));
    }
};


// UPDATE CUSTOMER
customerController.updateCustomer = async (req, res) => {
    try {
        const customer = await CustomerServices.updateCustomer(req.params.id, req.body);
        return res.status(200).json(createResult("Customer updated successfully", customer));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

module.exports = customerController;
