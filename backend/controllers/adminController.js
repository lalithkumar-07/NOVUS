import Admin from "../models/Admin.js";
import Team from "../models/Team.js";
import jwt from "jsonwebtoken";

/* ===========================
   ADMIN LOGIN
=========================== */

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: "Invalid login" });
    }

    const match = await admin.matchPassword(password);

    if (!match) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

/* ===========================
   GET ALL TEAMS
=========================== */

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });

    res.json(teams);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch teams" });
  }
};

/* ===========================
   VERIFY PAYMENT (UPI)
=========================== */

export const verifyPayment = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    team.payment.verified = true;
    team.isApproved = true;

    await team.save();

    res.json({ message: "Payment verified & team approved" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Verification failed" });
  }
};

/* ===========================
   MARK CASH PAYMENT
=========================== */

export const markCashPayment = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    team.payment.method = "cash";
    team.payment.verified = true;
    team.payment.paidAt = new Date();

    team.isApproved = true;

    await team.save();

    res.json({ message: "Cash payment marked & team approved" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cash update failed" });
  }
};
