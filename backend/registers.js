import express from "express";
import Team from "../models/Team.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {

    const {
      teamName,
      college,
      leader,
      members,
      consentAccepted
    } = req.body;

    if (!consentAccepted) {
      return res.status(400).json({ error: "Consent required" });
    }

    if (members.length > 4) {
      return res.status(400).json({ error: "Max 4 members allowed" });
    }

    const team = await Team.create({
      teamName,
      college,
      leader,
      members,
      consentAccepted
    });

    res.status(201).json({
      success: true,
      teamId: team._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
