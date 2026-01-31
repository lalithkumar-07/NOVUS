import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({

  teamName: { type: String, unique: true },
  college: String,

  leader: Object,
  members: Array,

  upiId: String,
  transactionId: String,

  status: {
    type: String,
    default: "PENDING_VERIFICATION"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Team", teamSchema);
