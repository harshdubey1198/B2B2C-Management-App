const cloudinary = require('../config/cloudinary.config');

// Upload image to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
                console.error('Cloudinary upload error:', error); // Log the error if Cloudinary upload fails
                reject(error);
            } else {
                console.log('Cloudinary upload success:', result); // Log the Cloudinary response
                resolve(result.secure_url); // Return the URL of the uploaded image
            }
        }).end(fileBuffer); // Use file buffer from Multer
    });
};


module.exports = uploadToCloudinary;
