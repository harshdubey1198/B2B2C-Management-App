const taskServices = require("../services/task.services")
const { createResult } = require("../utils/utills")

const taskController = {}

taskController.createTask = async (req, res) => {
    try {
        const newTask = await taskServices.createTask(req.body)
        return res.status(200).json(createResult("Task created Succefully", newTask))
    } catch (error) {
        console.log("error creating task", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

taskController.getAllTasks = async (req, res) => {
    try {
        const Tasks = await taskServices.getAllTasks()
        return res.status(200).json(createResult("Task fetched Succefully", Tasks))
    } catch (error) {
        console.log("error creating task", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

taskController.getTaskById = async (req, res) => {
    try {
        const Task = await taskServices.getTaskById(req.params.id)
        return res.status(200).json(createResult("Task fetched Succefully", Task))
    } catch (error) {
        console.log("error creating task", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

taskController.updateTask = async (req, res) => {
    try {
        const updatedTask = await taskServices.updateTask(req.params.id, req.body)
        return res.status(200).json(createResult("Task updated Succefully", updatedTask))
    } catch (error) {
        console.log("error updating task", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

taskController.updateAssignees = async (req, res) => {
    try {
        const updateAssignees = await taskServices.updateAssignees(req.params.id, req.body)
        return res.status(200).json(createResult("Task Assignee updated Succefully", updateAssignees))
    } catch (error) {
        console.log("error updating task assignee", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

module.exports = taskController