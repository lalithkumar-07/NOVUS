import crypto from "crypto";

export const verifyWebhook = (req, res, next) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers["x-razorpay-signature"];

  const expected = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (signature !== expected)
    return res.status(400).send("Invalid signature");

  next();
};
