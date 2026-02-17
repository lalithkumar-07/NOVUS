import mongoose from "mongoose";

/* MEMBER */
const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  roll: String,
  food: {
    type: String,
    enum: ["veg", "nonveg"],
    required: true
  }
});

/* TEAM */
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
    food: {
      type: String,
      enum: ["veg", "nonveg"],
      required: true
    }
  },

  members: [memberSchema],

  /* AUTO CALCULATED */
  teamSize: {
    type: Number
  },

  isApproved: {
    type: Boolean,
    default: false,
  },

  payment: {
  upiId: String,
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  method: {
    type: String,
    enum: ["upi", "cash"]
  },
  verified: { type: Boolean, default: false },
  paidAt: Date
},

},
{ timestamps: true }
);
// 🔒 Prevent duplicate registrations of same team
teamSchema.index(
  { teamName: 1, "leader.email": 1 },
  { unique: true }
);

export default mongoose.model("Team", teamSchema);
