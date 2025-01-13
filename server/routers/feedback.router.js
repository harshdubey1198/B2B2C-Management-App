const express = require('express');
const feedBackController = require('../controllers/feedback.controller');
const router = express.Router();
// const { tokenVerification } = require('../middleware/auth.middleware');

router.post('/create-feedback', feedBackController.createFeedBack);
router.get('/get-feedbacks', feedBackController.getFeedBacks);
router.get('/get-feedback/:id', feedBackController.getFeedBackById);
router.put('/update-feedback/:id', feedBackController.updateFeedBack);
router.delete('/delete-feedback/:id', feedBackController.deleteFeedBack);

module.exports = router;

