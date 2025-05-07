const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  familyMember: { type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember', default: null },
  reportType: String, // Blood test, MRI, etc.
  date: { type: Date, required: true },
  imageUrl: { type: String, required: true },
  tags: [String],
  category: String,
  type: { type: String, default: 'report' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
