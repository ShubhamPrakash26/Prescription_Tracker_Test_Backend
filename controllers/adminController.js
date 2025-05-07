const User = require("../models/User");
const Prescription = require("../models/Prescription");
const Report = require("../models/Report");

exports.getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const prescriptionCount = await Prescription.countDocuments();
    const reportCount = await Report.countDocuments();

    res.json({
      users: userCount,
      prescriptions: prescriptionCount,
      reports: reportCount
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    // Optionally, cascade delete prescriptions/reports if needed

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "User deletion failed" });
  }
};
