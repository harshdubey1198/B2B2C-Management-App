// Controller File (FeedBack.controller.js)
const multer = require('multer');
const FeedBackServices = require('../services/feedback.services');
const { createResult } = require('../utils/utills');
const { upload } = require('../utils/multer');
const uploadToCloudinary = require('../utils/cloudinary');

const feedBackController = {};

// CREATE FeedBack
feedBackController.createFeedBack = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
            return res.status(400).json({ error: `File upload error: ${err.message}` });
        }

        try {
            // Extract the form data from req.body
            const FeedBackData = { ...req.body };
            console.log(req.files.feedbackImage, "images")
            if (req.files && req.files.feedbackImage) {
                // Filter valid image files only
                const imageFiles = req.files.feedbackImage.filter(file =>
                    file.mimetype.startsWith('image/')
                );

                // Upload valid images to Cloudinary
                const imageUrls = await Promise.all(
                    imageFiles.map(async (file) => {
                        const uploadResponse = await uploadToCloudinary(file.buffer);
                        return uploadResponse;
                    })
                );
                console.log(imageUrls, "usrls")
                FeedBackData.feedbackImage = imageUrls; // Attach valid image URLs to feedbackImage
            }

            // Call the service to save feedback
            const newFeedBack = await FeedBackServices.createFeedBack(FeedBackData);
            return res.status(200).json(createResult('FeedBack created successfully', newFeedBack));
        } catch (error) {
            console.error('Error creating FeedBack:', error.message);
            return res.status(400).json(createResult(null, null, error.message));
        }
    });
};

// GET ALL FeedBackS
feedBackController.getFeedBacks = async (req, res) => {
    try {
        const FeedBacks = await FeedBackServices.getFeedBacks();
        return res.status(200).json(createResult('FeedBacks fetched successfully', FeedBacks));
    } catch (error) {
        console.error('Error fetching FeedBacks:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// GET SINGLE FeedBack BY ID
feedBackController.getFeedBackById = async (req, res) => {
    try {
        const FeedBack = await FeedBackServices.getFeedBackById(req.params.id);
        return res.status(200).json(createResult('FeedBack fetched successfully', FeedBack));
    } catch (error) {
        console.error('Error fetching FeedBack:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

// UPDATE FeedBack
feedBackController.updateFeedBack = async (req, res) => {
    upload(req, res, async function (err) {
        try {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: `Multer error: ${err.message}` });
            } else if (err) {
                return res.status(400).json({ error: `File upload error: ${err.message}` });
            }

             // Extract the form data from req.body
             const FeedBackData = { ...req.body };
             console.log(req.files.feedbackImage, "images")
             if (req.files && req.files.feedbackImage) {
                 // Filter valid image files only
                 const imageFiles = req.files.feedbackImage.filter(file =>
                     file.mimetype.startsWith('image/')
                 );
 
                 // Upload valid images to Cloudinary
                 const imageUrls = await Promise.all(
                     imageFiles.map(async (file) => {
                         const uploadResponse = await uploadToCloudinary(file.buffer);
                         return uploadResponse;
                     })
                 );
                 console.log(imageUrls, "usrls")
                 FeedBackData.feedbackImage = imageUrls; // Attach valid image URLs to feedbackImage
             }

            // If a new image is uploaded, handle Cloudinary upload
            if (req.files && req.files.FeedBackImage) {
                const imageUrl = await uploadToCloudinary(req.files.FeedBackImage[0].buffer);
                FeedBackData.FeedBackImage = imageUrl; // Attach the new image URL to FeedBackData
            }

            // Call the service to update the FeedBack with the new data
            const updatedFeedBack = await FeedBackServices.updateFeedBack(req.params.id, FeedBackData);
            return res.status(200).json(createResult('FeedBack updated successfully', updatedFeedBack));
        } catch (error) {
            console.error('Error updating FeedBack:', error.message);
            return res.status(400).json(createResult(null, null, error.message));
        }
    });
};

// DELETE FeedBack
feedBackController.deleteFeedBack = async (req, res) => {
    try {
        const deletedFeedBack = await FeedBackServices.deleteFeedBack(req.params.id);
        return res.status(200).json(createResult('FeedBack deleted successfully', deletedFeedBack));
    } catch (error) {
        console.error('Error deleting FeedBack:', error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

module.exports = feedBackController;