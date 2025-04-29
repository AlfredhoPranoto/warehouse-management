import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import usersRoute from "./routes/users.route.js";
import inventoryRoutes from "./routes/inventory.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();
// app.options("*", cors());
app.use(
  cors({
    origin: "http://localhost:5173", // Ganti dengan URL frontend yang benar
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type","Authorization"],
    credentials:true
  })
);
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/inventory", inventoryRoutes);
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

connectDB();

export default app;
