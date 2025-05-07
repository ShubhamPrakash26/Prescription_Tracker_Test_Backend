const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const familyController = require("../controllers/familyController");

// Apply auth middleware for all family routes
router.use(auth); 

// Define the family routes
router.get("/members", role("parent"), familyController.getFamilyMembers);
router.post("/add-member", role("parent"), familyController.addFamilyMember);
router.put("/member/:id", role("parent"), familyController.updateFamilyMember);
router.delete("/member/:id", role("parent"), familyController.deleteFamilyMember);

module.exports = router;