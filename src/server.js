import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import assetRoutes from "./routes/assetRoutes.js"

// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);


connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  (process.env.FRONTEND_URL || "").replace(/\/+$/, ""),
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server / curl
    const normalised = origin.replace(/\/+$/, "");
    if (allowedOrigins.includes(normalised)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    }
  },
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});