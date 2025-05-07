const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  uploadPrescription,
  getPrescriptions,
  getFamilyPrescriptions,
  getPrescriptionById,
  filterPrescriptions,
  deletePrescription
} = require('../controllers/prescriptionController');
const protect = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.post('/upload', protect, upload.single('file'), uploadPrescription);
router.get('/', protect, getPrescriptions);
router.get('/family/:id', protect, getFamilyPrescriptions);
router.get('/filter', protect, filterPrescriptions);
router.get('/:id', protect, getPrescriptionById);
router.delete('/:id', protect, deletePrescription);

module.exports = router;
