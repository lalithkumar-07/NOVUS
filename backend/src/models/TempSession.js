const tempSessionSchema = new mongoose.Schema({
  teamData: Object,

  consentAccepted: Boolean,

  status: {
    type: String,
    default: "CREATED"
  },

  expiresAt: {
    type: Date,
    index: { expires: 1800 } // 30 min TTL
  }
});
