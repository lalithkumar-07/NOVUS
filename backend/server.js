import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import registerRoute from "./routes/register.js";
import sessionRoutes from "./src/routes/session.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";

app.use("/api/session", sessionRoutes);
app.use("/api/payment", paymentRoutes);


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.use("/api/register", registerRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
