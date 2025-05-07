const Insurance = require("../models/Insurance");

exports.addInsurance = async (req, res) => {
  try {
    const { provider, policyNumber, coverage, validTill, member } = req.body;
    const documentUrl = req.file?.path || ""; // from multer

    const newPolicy = new Insurance({
      owner: req.user._id,
      member: member || null,
      provider,
      policyNumber,
      coverage,
      validTill,
      documentUrl
    });

    await newPolicy.save();
    res.status(201).json({ message: "Insurance uploaded", data: newPolicy });
  } catch (err) {
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
};

exports.getOwnInsurance = async (req, res) => {
  try {
    const policies = await Insurance.find({ owner: req.user._id, member: null });
    res.json(policies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch insurance" });
  }
};

exports.getFamilyInsurance = async (req, res) => {
  try {
    const policies = await Insurance.find({ owner: req.user._id, member: req.params.id });
    res.json(policies);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
};

exports.deleteInsurance = async (req, res) => {
  try {
    const deleted = await Insurance.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!deleted) return res.status(404).json({ error: "Policy not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
