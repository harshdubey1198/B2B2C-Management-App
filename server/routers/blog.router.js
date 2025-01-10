const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const { tokenVerification } = require('../middleware/auth.middleware');

router.post('/create-blog', tokenVerification, blogController.createBlog);
router.get('/get-blogs', blogController.getBlogs);
router.get('/get-blog/:id', blogController.getBlogById);
router.put('/update-blog/:id', tokenVerification, blogController.updateBlog);
router.delete('/delete-blog/:id', tokenVerification, blogController.deleteBlog);

module.exports = router;

