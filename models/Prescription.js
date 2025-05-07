const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  familyMember: { type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember', default: null },
  doctor: { type: String, required: true },
  hospital: { type: String, required: true },
  date: { type: Date, required: true },
  imageUrl: { type: String, required: true },
  tags: [String],
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
