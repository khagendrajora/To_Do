"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaskController_1 = require("./../controller/TaskController");
const router = express_1.default.Router();
router.post('/addTask', TaskController_1.addTask);
router.delete('/deleteTask/:id', TaskController_1.deleteTask);
router.put('/updateTask/:id', TaskController_1.updateTask);
router.get('/taskList', TaskController_1.taskList);
exports.default = router;
