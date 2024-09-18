const CategoryServices = require('../services/category.services');

const categoryController = {};

// CREATE CATEGORY
categoryController.createCategory = async (req, res) => {
    try {
        const response = await CategoryServices.createCategory(req.body);
        return res.status(200).json({ message: "Category created successfully", response });
    } catch (error) {
        console.log("Error creating category:", error);
        return res.status(500).json({ message: error });
    }
};

// GET ALL CATEGORIES
categoryController.getCategories = async (req, res) => {
    try {
        const categories = await CategoryServices.getCategories();
        return res.status(200).json(categories);
    } catch (error) {
        console.log("Error fetching categories:", error);
        return res.status(500).json({ message: error });
    }
};

// UPDATE CATEGORY
categoryController.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await CategoryServices.updateCategory(req.params.id, req.body);
        return res.status(200).json({ message: "Category updated successfully", updatedCategory });
    } catch (error) {
        console.log("Error updating category:", error);
        return res.status(500).json({ message: error });
    }
};

// DELETE CATEGORY
categoryController.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await CategoryServices.deleteCategory(req.params.id);
        return res.status(200).json({ message: "Category deleted successfully", deletedCategory });
    } catch (error) {
        console.log("Error deleting category:", error);
        return res.status(500).json({ message: error });
    }
};

module.exports = categoryController;
