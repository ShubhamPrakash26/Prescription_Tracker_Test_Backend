const Report = require('../models/Report');
const runOCR = require('../middleware/ocrParser');

exports.uploadReport = async (req, res) => {
  try {
    const file = req.file;
    const { reportType, date, familyMember } = req.body;

    if (!file) return res.status(400).json({ message: 'Image required' });

    const ocrResult = await runOCR(file.path);

    const imageUrl = `/uploads/${file.filename}`;

    const report = new Report({
      user: req.user._id,
      uploadedBy: req.user._id,
      familyMember: familyMember || null,
      reportType,
      date,
      imageUrl,
      tags: ocrResult.keywords,
      category: ocrResult.category
    });

    await report.save();

    res.status(201).json({ message: 'Report uploaded', report });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};
