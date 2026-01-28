import Razorpay from "razorpay";
import crypto from "crypto";
import TempSession from "../models/TempSession.js";
import Team from "../models/Team.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

export const createOrder = async (req, res) => {
  const { sessionId } = req.body;

  const session = await TempSession.findById(sessionId);

  if (!session || session.status !== "CONSENTED")
    return res.status(400).json({ error: "Invalid flow" });

  const order = await razorpay.orders.create({
    amount: 2000 * 100,
    currency: "INR"
  });

  res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY });
};
