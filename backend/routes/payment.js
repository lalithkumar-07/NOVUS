import express from "express";
import { submitPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/submit/:teamId", submitPayment);

export default router;
