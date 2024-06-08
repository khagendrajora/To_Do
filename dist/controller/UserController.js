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
exports.signOut = exports.login = exports.userList = exports.userRegister = void 0;
const user_1 = __importDefault(require("../model/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = 'hello';
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = new user_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user_1.default.findOne({ email: user.email })
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data) {
            return res.status(400).json({ error: 'Used Email' });
        }
        else {
            user = yield user.save();
            if (!user) {
                return res.status(400).json({ error: "Unable to save" });
            }
            else {
                res.send(user);
            }
        }
    })).catch(err => {
        return res.status(400).json({ error: 'failed', err });
    });
});
exports.userRegister = userRegister;
const userList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_1.default.find();
    if (!user) {
        return res.status(400).json({ error: 'failed' });
    }
    else {
        res.send(user);
    }
});
exports.userList = userList;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = req.body.email;
    try {
        let userData = yield user_1.default.findOne({ email });
        // .then((data) => {
        if (!userData) {
            return res.status(400).json({ error: 'Invalid Email' });
        }
        const data = {
            user: {
                id: userData._id
            }
        };
        const authToken = jsonwebtoken_1.default.sign({ data }, jwtSecret);
        if (req.body.password == userData.password) {
            res.cookie("mycookie", authToken, { expires: new Date(Date.now() + 1000000) });
            return (res.json({
                authTOken: authToken,
                id: userData._id,
                username: userData.username,
                email: userData.email
            }));
        }
        else {
            res.status(400).json({ error: 'password wrong' });
        }
    }
    catch (error) {
        return res.status(400).json({ error: error });
    }
});
exports.login = login;
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('mycookie');
    res.json({ message: "SignOut Success" });
});
exports.signOut = signOut;
