const Lead = require("../schemas/lead.schema");
const Task = require("../schemas/task.schema");
const User = require("../schemas/user.schema");

const taskServices = {}

taskServices.updateLeadStatus = async (leadId) => {
    const tasks = await Task.find({ leadId })
    if (!tasks || tasks.length === 0) {
        await Lead.findByIdAndUpdate(leadId, { status: "Pending" });
        return;
    }

    const allCompleted = tasks.every((task) => task.status === "Completed")
    const allMissed = tasks.every((task) => task.status === "Missed")
    const anyInProgress = tasks.some((task) => task.status === "In Progress");

}


taskServices.createTask = async (body) => {
    const {
        leadIds,  
        assignedTo = [],
        assignedBy,
        status,
        dueDate,
        remarks,
    } = body;

    // Validate lead and users (optional validation)
    /*
    const leadExistsArray = await Promise.all(
        leadIds.map(leadId => Lead.exists({ _id: leadId }))
    );
    if (leadExistsArray.includes(false)) {
        throw new Error("Invalid Lead ID(s)");
    }
    const assignedByUser = await CRMUser.exists({ _id: assignedBy });
    if (!assignedByUser) throw new Error("Invalid AssignedBy User ID");

    for (const userId of assignedTo) {
        const userExists = await CRMUser.exists({ _id: userId });
        if (!userExists) throw new Error(`Invalid AssignedTo User ID: ${userId}`);
    }
    */
    // Detect and identify duplicate leadIds
    const duplicateLeadIds = leadIds.filter((id, index, array) => array.indexOf(id) !== index);
    if (duplicateLeadIds.length > 0) {
        throw new Error(`Duplicate Lead IDs found: ${[...new Set(duplicateLeadIds)].join(", ")}`);
    }

    // Validate each leadId to ensure it exists in the database
    for (const leadId of leadIds) {
        const lead = await Lead.findOne({ _id: leadId });
        if (!lead) {
            throw new Error(`Invalid Lead ID or Lead is deleted: ${leadId}`);
        }
    }

     // Validate dueDate
     if (dueDate) {
        const taskDueDate = new Date(dueDate);
        for (const leadId of leadIds) {
            const lead = await Lead.findOne({ _id: leadId });
            if (lead && lead.dueDate && taskDueDate > new Date(lead.dueDate)) {
                throw new Error(`Task due date cannot be greater than the due date of lead: ${leadId}`);
            }
        }
        if (taskDueDate < new Date()) {
            throw new Error("Task due date must be in the future.");
        }
    }

    // Create the task with an array of leadIds
    const newTask = new Task({
        leadIds,  
        assignedTo,
        assignedBy,
        status: status || 'Pending',
        dueDate: dueDate || null,
        remarks: remarks || [],
    });

    const savedTask = await newTask.save();
    lead.status =  "Assigned"
    lead.save()
    return savedTask;
};

taskServices.getAllTasks = async () => {
    const tasks = await Task.find()
    .populate('leadIds')
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

taskServices.markMissedTasks = async () => {
    const missedTasks = await Task.find({
        status: { $in: ["Pending", "In Progress"]},
        dueDate: { $lte: new Date() },
    }).populate("assignedTo", "firstName lastName email")

    const updates = []
    for (const task of missedTasks){
        task.remarks.push({
            message: `Task missed by ${task.assignedTo.map(user => user.firstName + " " + user.lastName).join(", ")}`,
            createdAt: new Date(),
            createdBy: null
        })
        task.status = "Missed"
        updates.push(task.save())
    }

    await Promise.all(updates)
    return missedTasks
}


module.exports = taskServices