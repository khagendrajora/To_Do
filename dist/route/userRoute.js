"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
router.post('/signup', UserController_1.userRegister);
router.get('/userList', UserController_1.userList);
router.post('/login', UserController_1.login);
router.post('/signout', UserController_1.signOut);
exports.default = router;
