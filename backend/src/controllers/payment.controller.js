import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Team from "../models/Team.js";

export const createOrder = async (req, res) => {
  try {
    const { teamData } = req.body;

    const existing = await Team.findOne({
      teamName: teamData.teamName
    });

    if (existing)
      return res.status(400).json({
        error: "Team name already registered"
      });

    const order = await razorpay.orders.create({
      amount: 2000 * 100,
      currency: "INR",
      receipt: `novus_${Date.now()}`
    });

    res.json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order creation failed" });
  }
};

// FRONTEND VERIFY CALL
export const verifyPayment = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    teamData
  } = req.body;

  const sign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(
      razorpay_order_id + "|" + razorpay_payment_id
    )
    .digest("hex");

  if (sign !== razorpay_signature)
    return res.status(400).json({ error: "Invalid signature" });

  await Team.create({
    ...teamData,
    payment: {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      amount: 2000,
      status: "PAID"
    }
  });

  res.json({ success: true });
};

// WEBHOOK
export const razorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const body = JSON.stringify(req.body);

  const signature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature !== req.headers["x-razorpay-signature"])
    return res.status(400).send("Invalid");

  res.json({ status: "ok" });
};
