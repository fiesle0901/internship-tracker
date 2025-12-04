import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import authMiddleware from "./middleware/authMiddleware";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
