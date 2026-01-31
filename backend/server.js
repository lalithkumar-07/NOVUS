import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import paymentRoutes from "./routes/payment.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);
