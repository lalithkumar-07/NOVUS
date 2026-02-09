import Team from "../models/Team.js";

export const submitPayment = async (req, res) => {
  try {
    const teamId = req.params.teamId;

    console.log("PAYMENT FOR TEAM:", teamId);

    const { upiId, transactionId, method } = req.body;

    // validation
    if (!upiId || !transactionId) {
      return res.status(400).json({
        message: "UPI ID and Transaction ID required",
      });
    }

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    // 🔥 ensure payment object exists
    if (!team.payment) {
      team.payment = {};
    }

    team.payment.upiId = upiId;
    team.payment.transactionId = transactionId;
    team.payment.method = method || "upi";
    team.payment.verified = false;
    team.payment.paidAt = new Date();

    await team.save();

    console.log("PAYMENT SAVED FOR:", team._id);

    res.status(200).json({
      message: "Payment submitted successfully",
      teamId: team._id,
      payment: team.payment,
    });

  } catch (err) {
    console.error("PAYMENT ERROR STACK:", err);

    res.status(500).json({
      message: "Payment submission failed",
      error: err.message,
    });
  }
};
