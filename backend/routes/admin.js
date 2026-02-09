import express from "express";

import {
  getAllTeams,
  verifyPayment,
  markCashPayment,
} from "../controllers/adminController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = express.Router();

/* 🔒 Protect all admin routes */
router.use(protect, adminOnly);

router.get("/teams", getAllTeams);

router.put("/verify/:teamId", verifyPayment);

router.put("/cash/:teamId", markCashPayment);

export default router;
