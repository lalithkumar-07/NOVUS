import Team from "../models/Team.js";
export const registerTeam = async (req, res) => {
  try {

    console.log("📥 REGISTER BODY:", req.body);

    const team = await Team.create(req.body);

    res.status(201).json(team);

  } catch (err) {

    console.error("❌ REGISTER ERROR:", err);

    res.status(400).json({
      message: err.message,
      error: err
    });

  }
};
