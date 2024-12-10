const Task = require("../schemas/task.schema");
const User = require("../schemas/user.schema");

const taskServices = {}

taskServices.createTask = async (body) => {
    const {
        leadId,
        assignedTo = [],
        assignedBy,
        status,
        dueDate,
        remarks,
    } = body;

    // Validate lead and users
    // Uncomment this if you want to validate the existence of lead and users
    /*
    const [leadExists, assignedByUser] = await Promise.all([
        Lead.exists({ _id: leadId }),
        CRMUser.exists({ _id: assignedBy }),
    ]);

    if (!leadExists) throw new Error("Invalid Lead ID");
    if (!assignedByUser) throw new Error("Invalid AssignedBy User ID");

    for (const userId of assignedTo) {
        const userExists = await CRMUser.exists({ _id: userId });
        if (!userExists) throw new Error(`Invalid AssignedTo User ID: ${userId}`);
    }
    */

    // Validate dueDate (optional)
    if (dueDate && new Date(dueDate) < new Date()) {
        throw new Error("Due date must be in the future.");
    }

    // Create the task
    const newTask = new Task({
        leadId,
        assignedTo,
        assignedBy,
        status: status || 'Pending',
        dueDate: dueDate || null,
        remarks: remarks || [],
    });

    const savedTask = await newTask.save();
    return savedTask;
};


taskServices.getAllTasks = async () => {
    const tasks = await Task.find()
    .populate('leadId')
    .populate({
        path: 'assignedTo',
        select: 'firstName lastName email role' 
    })
    .populate({
        path: 'assignedBy',
        select: 'firstName lastName email role' 
    })
    .populate({
        path: 'remarks.createdBy',
        select: 'firstName lastName email role' 
    });
    if(tasks.length === 0){
        throw new Error("No task to show")
    }
    return tasks
}

taskServices.getTaskById = async (taskId) => {
    const task = await Task.findOne({_id: taskId})
    .populate('leadId')
    .populate({
        path: 'assignedTo',
        select: 'firstName lastName email role' 
    })
    .populate({
        path: 'assignedBy',
        select: 'firstName lastName email role' 
    })
    .populate({
        path: 'remarks.createdBy',
        select: 'firstName lastName email role' 
    });
    if(!task){
        throw new Error("No task to show")
    }
    return task
}

taskServices.updateTask = async (taskId, updates) => {
    const { status, dueDate, remarks } = updates;

    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");

    // Update status
    if (status) {
        if (!['Pending', 'Completed', 'In Progress', 'Overdue'].includes(status)) {
            throw new Error("Invalid status value");
        }
        task.status = status;
    }

    // Update dueDate
    if (dueDate) {
        if (new Date(dueDate) < new Date()) {
            throw new Error("Due date must be in the future");
        }
        task.dueDate = new Date(dueDate);
    }

    // Add remarks
    if (remarks) {
        task.remarks.push({
            message: remarks.message,
            createdBy: remarks.createdBy,
        });
    }

    const updatedTask = await task.save();
    return updatedTask;
};

taskServices.updateAssignees = async (taskId, body) => {
    const { addAssignees = [], removeAssignees = [], updatedBy } = body;

    // Fetch the task once
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");

    // Combine addAssignees and removeAssignees into a single database query
    const uniqueUserIds = [...new Set([...addAssignees, ...removeAssignees])];
    const users = await User.find({ _id: { $in: uniqueUserIds } }).select('firstName lastName');

    // Map user IDs to names for efficient lookup
    const userIdToNameMap = users.reduce((map, user) => {
        map[user._id.toString()] = `${user.firstName} ${user.lastName}`;
        return map;
    }, {});

    // Add assignees
    const addedNames = [];
    for (const userId of addAssignees) {
        if (!task.assignedTo.includes(userId)) {
            task.assignedTo.push(userId);
            addedNames.push(userIdToNameMap[userId]);
        }
    }

    // Remove assignees
    const removedNames = [];
    task.assignedTo = task.assignedTo.filter((userId) => {
        if (removeAssignees.includes(userId.toString())) {
            removedNames.push(userIdToNameMap[userId]);
            return false;
        }
        return true;
    });

    // Add a remark with names
    task.remarks.push({
        message: `Updated assignees: Added [${addedNames.join(", ")}], Removed [${removedNames.join(", ")}]`,
        createdBy: updatedBy,
    });

    // Save the updated task
    const updatedTask = await task.save();
    return updatedTask;
};




module.exports = taskServices