"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskList = exports.updateTask = exports.deleteTask = exports.addTask = void 0;
const task_1 = __importDefault(require("../model/task"));
const user_1 = __importDefault(require("../model/user"));
const taskHandlers_1 = __importDefault(require("../model/taskHandlers"));
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task, description, assignedTo, assignedBy, deadline } = req.body;
    try {
        const assignedToUser = yield user_1.default.findById(assignedTo);
        const assignedByUser = yield user_1.default.findById(assignedBy);
        if (!assignedToUser || !assignedByUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        let taskupdater = new taskHandlers_1.default({
            assignedTo: assignedToUser,
            assignedBy: assignedByUser
        });
        taskupdater = yield taskupdater.save();
        let tasks = new task_1.default({
            task,
            description,
            taskHandlers: taskupdater,
            deadline
        });
        tasks = yield tasks.save();
        if (!tasks) {
            return res.status(400).json({ error: "failed" });
        }
        else {
            res.send(tasks);
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.addTask = addTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        task_1.default.findByIdAndDelete(id)
            .then((item) => {
            if (!item) {
                return res.status(400).json({ error: "task not found" });
            }
            else {
                return res.status(200).json({ message: 'Task deleted' });
            }
        }).catch(err => {
            return res.status(400).json({ error: err });
        });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { task, description, assignedTo, assignedBy, deadline, status } = req.body;
    try {
        const assignedToUser = yield user_1.default.findById(assignedTo);
        const assignedByUser = yield user_1.default.findById(assignedBy);
        if (!assignedToUser || !assignedByUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        let taskupdater = new taskHandlers_1.default({
            assignedTo: assignedToUser,
            assignedBy: assignedByUser
        });
        taskupdater = yield taskupdater.save();
        const tasks = yield task_1.default.findByIdAndUpdate(id, {
            task,
            description,
            taskHandlers: taskupdater,
            status,
            deadline
        }, { new: true });
        if (!tasks) {
            return res.status(400).json({ error: "Update Failed" });
        }
        else {
            res.send(tasks);
            // console.log(tasks)
            // console.log(taskupdater)
        }
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.updateTask = updateTask;
const taskList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskList = yield task_1.default.find()
        .then((data) => {
        if (!data) {
            return res.status(400).json({ error: "task not found" });
        }
        else {
            res.send(data);
        }
    });
});
exports.taskList = taskList;
