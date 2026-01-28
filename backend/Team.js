import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  college: String,

  leader: {
    name: String,
    email: String,
    phone: String
  },

  members: [memberSchema],

  consentAccepted: Boolean,

  paymentStatus: {
    type: String,
    default: "PENDING"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Team", teamSchema);
