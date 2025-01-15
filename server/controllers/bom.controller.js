const BomServices = require('../services/bom.services');
const { createResult } = require('../utils/utills');

const bomController = {};

// CREATE bom
bomController.createbom = async (req, res) => {
    try {
        const newbom = await BomServices.createbom(req.body);
        return res.status(200).json(createResult("bom created successfully", newbom));
    } catch (error) {
        console.log('Error creating bom:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET ALL bomS
bomController.getboms = async (req, res) => {
    try {
        const boms = await BomServices.getboms(req.body);
        return res.status(200).json(createResult("boms fetched successfully", boms));
    } catch (error) {
        console.log('Error fetching boms:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET SINGLE bom
bomController.getbomById = async (req, res) => {
    try {
        const bom = await BomServices.getbomById(req.params.id);
        return res.status(200).json(createResult("bom fetched successfully", bom));
    } catch (error) {
        console.log('Error fetching bom:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// UPDATE bom
bomController.updatebom = async (req, res) => {
    try {
        const updatedbom = await BomServices.updatebom(req.params.id, req.body);
        return res.status(200).json(createResult("bom updated successfully", updatedbom));
    } catch (error) {
        console.log('Error updating bom:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

bomController.updatebomStatus = async (req, res) => {
    try {
        const updatedbomStatus = await BomServices.updatebomStatus(req.params.id, req.body);
        return res.status(200).json(createResult("bom status updated successfully", updatedbomStatus));
    } catch (error) {
        console.log('Error updating status of bom:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// DELETE bom
bomController.deletebom = async (req, res) => {
    try {
        const deletedbom = await BomServices.deletebom(req.params.id);
        return res.status(200).json(createResult("bom deleted successfully", deletedbom));
    } catch (error) {
        console.log('Error deleting bom:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

module.exports = bomController;
