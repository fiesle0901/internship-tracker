"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const entries_1 = __importDefault(require("./routes/entries"));
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
const process_1 = __importDefault(require("process"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/entries", (req, res, next) => {
    if (req.path === "/demo") {
        return next();
    }
    return (0, authMiddleware_1.default)(req, res, next);
}, entries_1.default);
const PORT = process_1.default.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
