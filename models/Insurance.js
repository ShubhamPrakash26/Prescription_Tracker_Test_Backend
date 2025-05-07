const mongoose = require("mongoose");

const insuranceSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Parent
  member: { type: mongoose.Schema.Types.ObjectId, ref: "FamilyMember", default: null }, // Optional
  provider: { type: String, required: true },
  policyNumber: { type: String, required: true },
  coverage: { type: String }, // Example: "Health, Accidental"
  validTill: { type: Date },
  documentUrl: { type: String }, // From cloudinary/local storage
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Insurance", insuranceSchema);
