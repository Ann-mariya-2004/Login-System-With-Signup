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
exports.getProfile = exports.login = exports.signup = void 0;
const User_1 = __importDefault(require("../modules/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, address, phone, photo, password } = req.body;
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists " });
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield User_1.default.create({ name, email, address, phone, photo, password: hashedPassword });
        return res.status(201).json({ message: "Signup Successfull " });
    }
    catch (err) {
        return res.status(500).json({ message: "Signup error", error: err });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found " });
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid password" });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ message: "Login success ", token, user });
    }
    catch (err) {
        return res.status(500).json({ message: "Login error", error: err });
    }
});
exports.login = login;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userId).select('-password');
        if (!user)
            return res.status(404).json({ message: "User not found" });
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json({ message: "Profile error", error: err });
    }
});
exports.getProfile = getProfile;
