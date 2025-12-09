import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import entriesRouter from "./routes/entries";
import authMiddleware from "./middleware/authMiddleware";
import process from "process";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(
  "/api/entries",
  (req, res, next) => {
    if (req.path === "/demo") {
      return next();
    }
    return authMiddleware(req, res, next);
  },
  entriesRouter
);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
