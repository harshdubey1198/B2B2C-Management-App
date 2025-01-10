const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|csv/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg, and .png formats are allowed!'));
    }
};
// const fileFilter = (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png|csv|json|xlsx|xls/;
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = fileTypes.test(file.mimetype);

//     if (mimetype && extname) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only .jpeg, .jpg, .png, .csv, .json, .xlsx, and .xls formats are allowed!'));
//     }
// };

// Multer configuration
const upload = multer({
    storage, 
    fileFilter, 
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
}).fields([
    { name: 'avatar', maxCount: 1 }, // Single file upload for avatar
    { name: 'file', maxCount: 1 }, 
    { name: 'blogImage', maxCount: 1 },
]);

module.exports = {
    upload
};
