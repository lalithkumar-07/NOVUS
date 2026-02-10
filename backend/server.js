import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import Admin from "./models/Admin.js";

import registerRoutes from "./routes/registerRoutes.js";
import paymentRoutes from "./routes/payment.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/admin.js";
import publicRoutes from "./routes/public.js";

dotenv.config();

const app = express();

/* ------------------ Middleware ------------------ */

// CORS — allow frontend domain later
const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "http://127.0.0.1:3000",  
  "https://thenovus.site",
  "https://www.thenovus.site",

  "https://novus-ivory.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked: " + origin));
      }
    },
    credentials: true
  })
);


app.use(express.json());
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Serve uploaded files */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ------------------ Routes ------------------ */

app.use("/api/register", registerRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);

/* ------------------ Root Test ------------------ */

app.get("/", (req, res) => {
  res.json({ status: "Backend running 🚀" });
});

/* ------------------ START SERVER AFTER DB ------------------ */

const startServer = async () => {
  try {

    await connectDB();

    console.log("✅ MongoDB Connected");

    /* ================================
       AUTO ADMIN — DEV ONLY
    ================================ */

    if (process.env.NODE_ENV !== "production") {

      const exists = await Admin.findOne({ username: "admin" });

      if (!exists) {
        await Admin.create({
          username: "admin",
          password: "admin123",
        });

        console.log("✅ Admin created → admin / admin123");
      } else {
        console.log("ℹ️ Admin already exists");
      }

    }

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Server startup failed:", err.message);
    process.exit(1);
  }
};

startServer();
