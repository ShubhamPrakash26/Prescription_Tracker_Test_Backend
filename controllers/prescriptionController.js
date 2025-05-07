const Prescription = require('../models/Prescription');
const runOCR = require('../middleware/ocrParser');
const cloudinary = require('../config/cloudinary'); // if using cloud
const fs = require('fs');

// @route POST /api/records/upload
exports.uploadPrescription = async (req, res) => {
  try {
    const file = req.file;
    const { doctor, hospital, date, familyMember } = req.body;

    if (!file) return res.status(400).json({ message: 'Image required' });

    // OCR categorization
    const ocrResult = await runOCR(file.path); // returns { keywords, category }

    // OPTIONAL: Upload to Cloudinary
    // const result = await cloudinary.uploader.upload(file.path);
    // const imageUrl = result.secure_url;

    const imageUrl = `/uploads/${file.filename}`; // using local path

    const prescription = new Prescription({
      user: req.user._id,
      uploadedBy: req.user._id,
      familyMember: familyMember || null,
      doctor,
      hospital,
      date,
      imageUrl,
      tags: ocrResult.keywords,
      category: ocrResult.category
    });

    await prescription.save();

    // fs.unlinkSync(file.path); // delete from local if using cloud

    res.status(201).json({ message: 'Prescription uploaded', prescription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error uploading prescription', error: err.message });
  }
};

// Get all prescriptions of logged-in user
exports.getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching prescriptions' });
  }
};

// Get all prescriptions of a specific family member (parent only)
exports.getFamilyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      user: req.user._id,
      familyMember: req.params.id
    }).sort({ date: -1 });

    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching family member prescriptions' });
  }
};

// Get one prescription by ID
exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) return res.status(404).json({ message: 'Not found' });

    res.status(200).json(prescription);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching prescription' });
  }
};

// Filter prescriptions by tags, category, date
exports.filterPrescriptions = async (req, res) => {
  try {
    const { tags, category, startDate, endDate } = req.query;

    let filter = { user: req.user._id };

    if (tags) filter.tags = { $in: tags.split(',') };
    if (category) filter.category = category;
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const prescriptions = await Prescription.find(filter).sort({ date: -1 });
    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Error filtering prescriptions' });
  }
};

// Delete prescription
exports.deletePrescription = async (req, res) => {
  try {
    const presc = await Prescription.findById(req.params.id);
    if (!presc) return res.status(404).json({ message: 'Not found' });

    if (presc.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Prescription.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Prescription deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting prescription' });
  }
};
