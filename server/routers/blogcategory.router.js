const express = require('express');
const router = express.Router();
const blogCategoryController = require('../controllers/blogCategory.controller');
const { tokenVerification } = require('../middleware/auth.middleware');

router.post('/create-blogCategory/:id', tokenVerification, blogCategoryController.createBlogCategory);
router.get('/get-blogCategories/:id', blogCategoryController.getBlogCategories);
router.get('/get-blogCategory/:id', blogCategoryController.getBlogCategoryById);
router.put('/update-blogCategory/:id', tokenVerification, blogCategoryController.updateBlogCategory);
router.delete('/delete-blogCategory/:id', tokenVerification, blogCategoryController.deleteBlogCategory);

module.exports = router;
