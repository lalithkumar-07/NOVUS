import express from "express";
import { deleteTeam } from "../controllers/adminController.js";
import { getFoodReport } from "../controllers/adminController.js";

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

router.delete("/team/:teamId", deleteTeam);

router.get("/food-report", getFoodReport);

export default router;
