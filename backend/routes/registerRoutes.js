import express from "express";
import { registerTeam } from "../controllers/registerController.js";

const router = express.Router();

/* TEST ROUTE */
router.get("/", (req, res) => {
  res.json({ message: "Register API working" });
});

/* REGISTER TEAM */
router.post("/", registerTeam);

export default router;
