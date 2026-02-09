import express from "express";
import Team from "../models/Team.js";

const router = express.Router();

/* GET ONLY APPROVED TEAMS */
router.get("/slots", async (req, res) => {
  try {
    const teams = await Team.find({ isApproved: true }).sort({
      createdAt: 1,
    });

    res.json(teams);
  } catch {
    res.status(500).json({ message: "Failed to load slots" });
  }
});

export default router;
