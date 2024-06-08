import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    taskHandlers: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'TaskHandler'
    },
    status: {
        type: String,
        default: "pending"
    },
    deadline: {
        type: Date,
        required: true,
        validate: {
            validator: (value: Date) => value > new Date(),
            message: 'Deadline must be a future date.'
        }
    }

})

const Task = mongoose.model('Task', taskSchema)
export default Task

