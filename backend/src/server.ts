import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import entriesRouter from "./routes/entries";
import authMiddleware from "./middleware/authMiddleware";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/entries", authMiddleware, entriesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
