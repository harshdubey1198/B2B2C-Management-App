// Controller File (blog.controller.js)
const multer = require('multer');
const BlogServices = require('../services/blog.services');
const { createResult } = require('../utils/utills');
const { upload } = require('../utils/multer');
const uploadToCloudinary = require('../utils/cloudinary');

const blogController = {};

// CREATE BLOG
blogController.createBlog = async (req, res) => {
    upload(req, res, async function (err) {
        try {
          if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: `Multer error: ${err.message}` });
          } else if (err) {
            return res.status(400).json({ error: `File upload error: ${err.message}` });
          }
    
          // Extract the form data from req.body
          const blogData = { ...req.body };
          
          if (req.files && req.files.blogImage) {
            const imageUrl = await uploadToCloudinary(req.files.blogImage[0].buffer); // Upload to Cloudinary
            blogData.blogImage = imageUrl; // Attach Cloudinary URL to blogData
          }
          // Call the service to handle registration
          const newBlog = await BlogServices.createBlog(blogData);
          return res.status(200).json(createResult('Blog created successfully', newBlog));
        } catch (error) {
          console.error('Error creating blog:', error.message);
          return res.status(400).json(createResult(null, null, error.message));
        }
      });
};

// GET ALL BLOGS
blogController.getBlogs = async (req, res) => {
    try {
        const blogs = await BlogServices.getBlogs();
        return res.status(200).json(createResult('Blogs fetched successfully', blogs));
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET SINGLE BLOG BY ID
blogController.getBlogById = async (req, res) => {
    try {
        const blog = await BlogServices.getBlogById(req.params.id);
        return res.status(200).json(createResult('Blog fetched successfully', blog));
    } catch (error) {
        console.error('Error fetching blog:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// UPDATE BLOG
blogController.updateBlog = async (req, res) => {
    upload(req, res, async function (err) {
        try {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: `Multer error: ${err.message}` });
            } else if (err) {
                return res.status(400).json({ error: `File upload error: ${err.message}` });
            }

            // Extract the form data from req.body
            const blogData = { ...req.body };

            // If a new image is uploaded, handle Cloudinary upload
            if (req.files && req.files.blogImage) {
                const imageUrl = await uploadToCloudinary(req.files.blogImage[0].buffer);
                blogData.blogImage = imageUrl; // Attach the new image URL to blogData
            }

            // Call the service to update the blog with the new data
            const updatedBlog = await BlogServices.updateBlog(req.params.id, blogData);
            return res.status(200).json(createResult('Blog updated successfully', updatedBlog));
        } catch (error) {
            console.error('Error updating blog:', error.message);
            return res.status(400).json(createResult(null, null, error.message));
        }
    });
};

// DELETE BLOG
blogController.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await BlogServices.deleteBlog(req.params.id);
        return res.status(200).json(createResult('Blog deleted successfully', deletedBlog));
    } catch (error) {
        console.error('Error deleting blog:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET SINGLE BLOG BY ID
blogController.getBlogBySlug = async (req, res) => {
    try {
        const blog = await BlogServices.getBlogBySlug(req.params.slug);
        return res.status(200).json(createResult('Blog fetched successfully', blog));
    } catch (error) {
        console.error('Error fetching blog:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// UPDATE BLOG
blogController.updateBlogBySlug = async (req, res) => {
    upload(req, res, async function (err) {
        try {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: `Multer error: ${err.message}` });
            } else if (err) {
                return res.status(400).json({ error: `File upload error: ${err.message}` });
            }

            // Extract the form data from req.body
            const blogData = { ...req.body };

            // If a new image is uploaded, handle Cloudinary upload
            if (req.files && req.files.blogImage) {
                const imageUrl = await uploadToCloudinary(req.files.blogImage[0].buffer);
                blogData.blogImage = imageUrl; // Attach the new image URL to blogData
            }

            // Call the service to update the blog with the new data
            const updatedBlog = await BlogServices.updateBlogBySlug(req.params.slug, blogData);
            return res.status(200).json(createResult('Blog updated successfully', updatedBlog));
        } catch (error) {
            console.error('Error updating blog:', error.message);
            return res.status(400).json(createResult(null, null, error.message));
        }
    });
};

module.exports = blogController;