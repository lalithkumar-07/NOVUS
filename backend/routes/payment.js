import express from "express";
import Team from "../models/Team.js";

const router = express.Router();

/* Save team + payment info */

router.post("/submit", async (req, res) => {

  try {

    const {
      teamName,
      college,
      leader,
      members,
      upiId,
      transactionId
    } = req.body;

    if (!upiId || !transactionId)
      return res.status(400).json({
        msg: "Missing payment info"
      });

    const exists = await Team.findOne({ teamName });

    if (exists)
      return res.status(400).json({
        msg: "Team already registered"
      });

    await Team.create({
      teamName,
      college,
      leader,
      members,
      upiId,
      transactionId,
      status: "PENDING_VERIFICATION"
    });

    res.json({ success: true });

  } catch (err) {

    console.log(err);
    res.status(500).json({
      error: "Server error"
    });

  }

});

export default router;
