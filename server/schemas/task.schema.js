const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    leadIds: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Lead',
    }],
    assignedTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CRMUser',
        },
    ],
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CRMUser',
    },
    assignDate: {
        type: Date,
        default: Date.now, 
    },
    remarks: [
        {
            message: String,
            createdAt: { type: Date, default: Date.now },
            createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'CRMUser' },
        },
    ],
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'In Progress', 'Missed', 'Overdue'],
        default: 'Pending', 
    },
    // priority: {
    //     type: String,
    //     enum: ['Low', 'Medium', 'High', 'Critical'],
    //     default: 'Medium',
    // },
    dueDate: {
        type: Date, 
        validate: {
            validator: function(value) {
                return value > Date.now();
            },
            message: 'Due date must be in the future.',
        },
        default: null,
    },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
