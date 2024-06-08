import mongoose from 'mongoose'

const taskupdater = new mongoose.Schema({

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true })

const taskHandler = mongoose.model('TaskHandler', taskupdater)
export default taskHandler

