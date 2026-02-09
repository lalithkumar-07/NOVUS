import Team from "../models/Team.js";

export const submitPayment = async (req, res) => {
  try {

    // ✅ ID must come from URL params
    const teamId = req.params.teamId;

    console.log("TEAM ID FROM URL:", teamId);

    const { upiId, transactionId, method } = req.body;

    if (!upiId || !transactionId) {
      return res.status(400).json({
        message: "UPI ID and Transaction ID required"
      });
    }

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    team.payment.upiId = upiId;
    team.payment.transactionId = transactionId;
    team.payment.method = method || "upi";
    team.payment.verified = false;
    team.payment.paidAt = new Date();

    await team.save();

    res.json({
      message: "Payment submitted successfully",
      payment: team.payment
    });

  } catch (err) {
    console.error("PAYMENT ERROR:", err);
    res.status(500).json({
      message: "Payment submission failed"
    });
  }
};
