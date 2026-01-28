import TempSession from "../models/TempSession.js";

export const startSession = async (req, res) => {
  const { teamData } = req.body;

  const session = await TempSession.create({ teamData });

  res.json({ sessionId: session._id });
};

export const confirmConsent = async (req, res) => {
  const { sessionId } = req.body;

  const session = await TempSession.findById(sessionId);

  if (!session) return res.status(404).json({ error: "Session expired" });

  session.consentAccepted = true;
  session.status = "CONSENTED";
  await session.save();

  res.json({ success: true });
};

export const getSession = async (req, res) => {
  const session = await TempSession.findById(req.params.id);
  if (!session) return res.status(404).json({ error: "Invalid session" });

  res.json(session);
};
