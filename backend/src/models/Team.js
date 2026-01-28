import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  roll: String
});

const teamSchema = new mongoose.Schema({
  teamName: { type: String, unique: true },
  college: String,

  leader: personSchema,
  members: [personSchema],

  payment: {
    orderId: String,
    paymentId: String,
    signature: String,
    amount: Number,
    status: String
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Team", teamSchema);
