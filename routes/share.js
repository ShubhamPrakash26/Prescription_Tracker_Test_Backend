const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const shareController = require("../controllers/shareController");

router.use(auth);

router.post("/share/:id", shareController.shareRecord);
router.get("/shared-log", shareController.getShareLog);

module.exports = router;
