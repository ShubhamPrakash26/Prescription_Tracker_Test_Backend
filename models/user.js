const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  aadhar: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  dob: { type: Date, required: true },
  role: {
    type: String,
    enum: ['admin', 'parent', 'member'],
    default: 'parent',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // Points to the parent in case of a member user
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FamilyMember', // Reference to family members (children)
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
