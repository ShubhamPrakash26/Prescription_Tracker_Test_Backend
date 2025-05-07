const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadReport } = require('../controllers/reportController');

router.post('/upload', protect, upload.single('image'), uploadReport);

module.exports = router;
