const BlogCategoryServices = require('../services/blogCategory.services');
const { createResult } = require('../utils/utills');

const blogCategoryController = {};

// CREATE BLOG CATEGORY
blogCategoryController.createBlogCategory = async (req, res) => {
    try {
        const newBlogCategory = await BlogCategoryServices.createBlogCategory(req.params.id, req.body);
        return res.status(200).json(createResult("Blog category created successfully", newBlogCategory));
    } catch (error) {
        console.log('Error creating blog category:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET ALL BLOG CATEGORIES
blogCategoryController.getBlogCategories = async (req, res) => {
    try {
        const blogCategories = await BlogCategoryServices.getBlogCategories(req.params.id);
        return res.status(200).json(createResult("Blog categories fetched successfully", blogCategories));
    } catch (error) {
        console.log('Error fetching blog categories:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET SINGLE BLOG CATEGORY
blogCategoryController.getBlogCategoryById = async (req, res) => {
    try {
        const blogCategory = await BlogCategoryServices.getBlogCategoryById(req.params.id);
        return res.status(200).json(createResult("Blog category fetched successfully", blogCategory));
    } catch (error) {
        console.log('Error fetching blog category:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// UPDATE BLOG CATEGORY
blogCategoryController.updateBlogCategory = async (req, res) => {
    try {
        const updatedBlogCategory = await BlogCategoryServices.updateBlogCategory(req.params.id, req.body);
        return res.status(200).json(createResult("Blog category updated successfully", updatedBlogCategory));
    } catch (error) {
        console.log('Error updating blog category:', error.message); 
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// DELETE BLOG CATEGORY
blogCategoryController.deleteBlogCategory = async (req, res) => {
    try {
        const deletedBlogCategory = await BlogCategoryServices.deleteBlogCategory(req.params.id);
        return res.status(200).json(createResult("Blog category deleted successfully", deletedBlogCategory));
    } catch (error) {
        console.log('Error deleting blog category:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

module.exports = blogCategoryController;
