const CustomerServices = require('../services/customer.services');
const { createResult } = require('../utils/utills');

const customerController = {};

// SEARCH CUSTOMER
customerController.searchCustomer = async (req, res) => {
    try {
        const searchQuery = req.query.q
        const firmId = req.query.firmId
        const customer = await CustomerServices.searchCustomer(searchQuery, firmId);
        return res.status(200).json(createResult("Category created successfully", customer));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};


module.exports = customerController;
