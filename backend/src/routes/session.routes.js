import express from "express";
import {
  startSession,
  confirmConsent,
  getSession
} from "../controllers/session.controller.js";

const router = express.Router();

router.post("/start", startSession);
router.post("/consent", confirmConsent);
router.get("/:id", getSession);

export default router;
