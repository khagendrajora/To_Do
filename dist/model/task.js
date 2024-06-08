"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    taskHandlers: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
            validator: (value) => value > new Date(),
            message: 'Deadline must be a future date.'
        }
    }
});
const Task = mongoose_1.default.model('Task', taskSchema);
exports.default = Task;
