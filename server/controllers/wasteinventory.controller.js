const wasteManagmentServices = require('../services/wasteinventory.services');
const { createResult } = require('../utils/utills');

const wasteManagmentController = {};

// GET ALL wasteManagmentS UNDER FIRMS
wasteManagmentController.getwasteManagments = async (req, res) => {
    try {
        const wasteManagments = await wasteManagmentServices.getwasteManagments(req.params.id);
        return res.status(200).json(createResult("wasteManagments fetched successfully", wasteManagments));
    } catch (error) {
        console.log('Error fetching wasteManagments:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET SINGLE wasteManagment
wasteManagmentController.getwasteManagmentById = async (req, res) => {
    try {
        const wasteManagment = await wasteManagmentServices.getwasteManagmentById(req.params.id);
        return res.status(200).json(createResult("wasteManagment fetched successfully", wasteManagment));
    } catch (error) {
        console.log('Error fetching wasteManagment:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

module.exports = wasteManagmentController;
