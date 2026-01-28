import express from "express";
import {
  createOrder,
  verifyPayment,
  razorpayWebhook
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
router.post("/webhook", razorpayWebhook);

export default router;
