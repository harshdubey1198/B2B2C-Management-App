const BrandServices = require('../services/brand.services');
const { createResult } = require('../utils/utills');

const brandController = {};

// CREATE BRAND
brandController.createBrand = async (req, res) => {
    try {
        const newBrand = await BrandServices.createBrand(req.params.id, req.body);
        return res.status(200).json(createResult("Brand created successfully", newBrand));
    } catch (error) {
        console.log('Error creating brand:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET ALL BRANDS
brandController.getBrands = async (req, res) => {
    try {
        const brands = await BrandServices.getBrands(req.params.id);
        return res.status(200).json(createResult("Brands fetched successfully", brands));
    } catch (error) {
        console.log('Error fetching brands:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET SINGLE BRAND
brandController.getBrandById = async (req, res) => {
    try {
        const brand = await BrandServices.getBrandById(req.params.id);
        return res.status(200).json(createResult("Brand fetched successfully", brand));
    } catch (error) {
        console.log('Error fetching brand:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// UPDATE BRAND
brandController.updateBrand = async (req, res) => {
    try {
        const updatedBrand = await BrandServices.updateBrand(req.params.id, req.body);
        return res.status(200).json(createResult("Brand updated successfully", updatedBrand));
    } catch (error) {
        console.log('Error updating brand:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// DELETE BRAND
brandController.deleteBrand = async (req, res) => {
    try {
        const deletedBrand = await BrandServices.deleteBrand(req.params.id);
        return res.status(200).json(createResult("Brand deleted successfully", deletedBrand));
    } catch (error) {
        console.log('Error deleting brand:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

module.exports = brandController;
