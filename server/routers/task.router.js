const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middleware/auth.middleware');
const taskController = require('../controllers/task.controller')

router.post('/create-task',tokenVerification, taskController.createTask);
router.get('/get-tasks', taskController.getAllTasks);
router.get('/get-task/:id', taskController.getTaskById);
router.put('/update-task/:id',tokenVerification, taskController.updateTask);
router.put('/update-assignee/:id',tokenVerification, taskController.updateAssignees);
router.post('/mark-missed', taskController.markMissedTasks);
// router.delete('/delete-task/:id', tokenVerification, taskController.deleteTask);

module.exports = router;
