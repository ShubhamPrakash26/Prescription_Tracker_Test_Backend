const ShareRecord = require("../models/ShareRecord");
const Prescription = require("../models/Prescription");
const Report = require("../models/Report");
// Assume you have nodemailer configured in /utils
const sendEmail = require("../utils/sendEmail");
const sendWhatsApp = require("../utils/sendWhatsApp");

exports.shareRecord = async (req, res) => {
  try {
    const { recordId, recordType, platform, sharedWith } = req.body;

    let record;
    if (recordType === "Prescription") {
      record = await Prescription.findById(recordId);
    } else if (recordType === "Report") {
      record = await Report.findById(recordId);
    }

    if (!record) return res.status(404).json({ error: "Record not found" });

    // Compose message
    const link = record.fileUrl || record.imageUrl;
    const message = `Shared Medical Record (${recordType}): ${link}`;

    // Send
    if (platform === "email") {
      await sendEmail(sharedWith, "Shared Medical Record", message);
    } else if (platform === "whatsapp") {
      await sendWhatsApp(sharedWith, message);
    }

    const newShare = new ShareRecord({
      user: req.user._id,
      recordId,
      recordType,
      platform,
      sharedWith
    });

    await newShare.save();

    res.json({ message: "Shared successfully" });
  } catch (err) {
    res.status(500).json({ error: "Sharing failed", details: err.message });
  }
};

exports.getShareLog = async (req, res) => {
  try {
    const logs = await ShareRecord.find({ user: req.user._id }).sort({ sharedAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Log fetch failed" });
  }
};
