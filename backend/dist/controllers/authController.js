"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res) => {
    console.log("REGISTER CONTROLLER STARTED", req.body);
    try {
        const { email, password } = req.body;
        const emailExists = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (emailExists)
            return res.status(400).json({ message: "Email already exists" });
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma_1.prisma.user.create({
            data: { email, password: hashedPassword },
        });
        res.json({ message: "User is registered", user });
    }
    catch (err) {
        console.error("REGISTER ERROR:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const valid = await bcrypt_1.default.compare(password, user.password);
        if (!valid)
            return res.status(401).json({ message: "Invalid password" });
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.json({ message: "Login successful", token, user });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
};
exports.login = login;
