import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import employeeRoutes from "./routes/employee.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/employees", authMiddleware, employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
