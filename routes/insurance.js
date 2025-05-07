const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const insuranceController = require("../controllers/insuranceController");

router.use(auth);

router.post("/add", upload.single("document"), insuranceController.addInsurance);
router.get("/", insuranceController.getOwnInsurance);
router.get("/family/:id", insuranceController.getFamilyInsurance);
router.delete("/:id", insuranceController.deleteInsurance);

module.exports = router;
