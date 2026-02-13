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

/* ===========================
   DELETE TEAM
=========================== */

export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    await Team.findByIdAndDelete(req.params.teamId);

    res.json({ message: "Team deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete team" });
  }
};

/* ===========================
   FOOD REPORT
=========================== */
export const getFoodReport = async (req, res) => {
  try {
    const teams = await Team.find();

    let totalMembers = 0;
    let totalVeg = 0;
    let totalNonVeg = 0;

    const report = teams.map(t => {

      let veg = 0;
      let nonveg = 0;

      // leader
      if (t.leader?.food === "veg") veg++;
      if (t.leader?.food === "nonveg") nonveg++;

      // members
      t.members.forEach(m => {
        if (m.food === "veg") veg++;
        if (m.food === "nonveg") nonveg++;
      });

      const teamTotal = veg + nonveg;

      totalMembers += teamTotal;
      totalVeg += veg;
      totalNonVeg += nonveg;

      return {
        teamName: t.teamName,
        leader: t.leader?.name,
        total: teamTotal,
        veg,
        nonveg
      };
    });

    res.json({
      totals: {
        totalMembers,
        totalVeg,
        totalNonVeg
      },
      teams: report
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate food report" });
  }
};
