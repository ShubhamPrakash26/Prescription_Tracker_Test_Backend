const mongoose = require("mongoose");

const shareRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recordId: { type: mongoose.Schema.Types.ObjectId, required: true },
  recordType: { type: String, enum: ["Prescription", "Report"], required: true },
  sharedWith: { type: String, required: true }, // email or phone
  platform: { type: String, enum: ["email", "whatsapp"], required: true },
  sharedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ShareRecord", shareRecordSchema);
