"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
require("./db/db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const userRoute_1 = __importDefault(require("./route/userRoute"));
const taskRoute_1 = __importDefault(require("./route/taskRoute"));
app.use('/api', userRoute_1.default);
app.use('/api', taskRoute_1.default);
const port = 3000;
app.get('/', (req, res) => {
    res.send('Express node + typescript project');
});
app.listen(port, () => {
    console.log(`Server listned on port ${port}`);
});
