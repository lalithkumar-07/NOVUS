import Team from "../models/Team.js";

export const registerTeam = async (req, res) => {
  try {

    const { teamName, leader, members } = req.body;

    // calculate size
    const teamSize = 1 + (members?.length || 0);

    // check existing team
    let team = await Team.findOne({
      teamName,
      "leader.email": leader.email
    });

    // 🔁 UPDATE existing team instead of duplicate
    if (team) {
      team.set({
        ...req.body,
        teamSize
      });

      await team.save();

      return res.status(200).json({
        message: "Team details updated",
        team
      });
    }

    // 🆕 CREATE only if new team
    team = await Team.create({
      ...req.body,
      teamSize
    });

    res.status(201).json({
      message: "Team registered successfully",
      team
    });

  } catch (err) {

    // duplicate index protection
    if (err.code === 11000)
      return res.status(400).json({ message: "Team already registered" });

    console.error("❌ REGISTER ERROR:", err);
    res.status(400).json({ message: err.message });
  }
};
