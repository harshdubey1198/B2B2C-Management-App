const CategoryServices = require('../services/category.services');
const { createResult } = require('../utils/utills');

const categoryController = {};

// CREATE CATEGORY
categoryController.createCategory = async (req, res) => {
    try {
        const newCategory = await CategoryServices.createCategory(req.params.id, req.body);
        return res.status(200).json(createResult("Category created successfully", newCategory));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET SUB CATEGORIES
categoryController.getSubcategories = async (req, res) => {
    try {
        const subcategories = await CategoryServices.getSubcategories(req.params.id);
        return res.status(200).json(createResult("Subcategories fetched successfully", subcategories));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET ALL CATEGORIES
categoryController.getCategory = async (req, res) => {
    try {
        const categories = await CategoryServices.getCategory(req.params.id);
        return res.status(200).json(createResult("Categories fetched successfully", categories));
    } catch (error) {
        return res.status(500).json(createResult(null, null, error.message));
    }
};

// UPDATE CATEGORY
categoryController.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await CategoryServices.updateCategory(req.params.id, req.body);
        return res.status(200).json(createResult("Category updated successfully", updatedCategory));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// DELETE CATEGORY
categoryController.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await CategoryServices.deleteCategory(req.params.id);
        return res.status(200).json(createResult("Category deleted successfully", deletedCategory));
    } catch (error) {
        return res.status(400).json(createResult(null, null, error.message));
    }
};

module.exports = categoryController;
