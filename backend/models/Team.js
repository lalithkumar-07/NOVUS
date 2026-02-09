import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  roll: String,
});

const teamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true },
    college: { type: String, required: true },
    department: { type: String, required: true },

    leader: {
      name: String,
      email: String,
      phone: String,
      roll: String,
    },

    members: [memberSchema],

    /* ✅ ROOT LEVEL APPROVAL FLAG */
    isApproved: {
      type: Boolean,
      default: false,
    },

    payment: {
      upiId: String,

      transactionId: String,

      method: {
        type: String,
        enum: ["upi", "cash"],
        default: "upi",
      },

      verified: {
        type: Boolean,
        default: false,
      },

      paidAt: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Team", teamSchema);
