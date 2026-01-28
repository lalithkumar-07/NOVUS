const personSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    lowercase: true
  },

  phone: String,

  roll: String
});

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  leader: personSchema,

  members: {
    type: [personSchema],
    validate: v => v.length <= 3
  },

  totalCount: Number,

  payment: Object,

  createdAt: {
    type: Date,
    default: Date.now
  }
});
