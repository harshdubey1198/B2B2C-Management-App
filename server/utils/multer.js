const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg, and .png formats are allowed!'));
    }
};

// Multer configuration
const upload = multer({
    storage, 
    fileFilter, 
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

module.exports = {
    upload
};
