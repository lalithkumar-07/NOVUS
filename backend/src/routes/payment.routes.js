import express from "express";
import { verifyWebhook } from "../middlewares/verifyWebhook.js";
import Team from "../models/Team.js";
import TempSession from "../models/TempSession.js";

const router = express.Router();

router.post("/webhook", verifyWebhook, async (req, res) => {

  const payload = req.body.payload.payment.entity;
  const sessionId = payload.notes.sessionId;

  const session = await TempSession.findById(sessionId);

  if (!session) return res.sendStatus(200);

  await Team.create(session.teamData);

  session.status = "PAID";
  await session.save();

  res.sendStatus(200);
});

export default router;
