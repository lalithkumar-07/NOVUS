import Team from "../models/Team.js";

export const registerTeam = async (req, res) => {
  try {

    console.log("📥 REGISTER BODY:", req.body);

    const {
      teamName,
      college,
      department,
      leader,
      members
    } = req.body;

    // Calculate team size (leader + members)
    const teamSize = 1 + (members?.length || 0);

    const team = await Team.create({
      teamName,
      college,
      department,
      leader,
      members,
      teamSize
    });

    res.status(201).json({
      message: "Team registered successfully",
      team
    });

  } catch (err) {

    console.error("❌ REGISTER ERROR:", err);

    res.status(400).json({
      message: err.message,
      error: err
    });

  }
};
