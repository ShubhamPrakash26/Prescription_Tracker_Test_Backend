const mongoose = require("mongoose");

const familyMemberSchema = new mongoose.Schema({
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  aadhar: { type: String },
  bloodGroup: { type: String },
  dob: { type: Date },
  relation: { type: String, required: true }, // e.g. 'son', 'mother'
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FamilyMember", familyMemberSchema);
