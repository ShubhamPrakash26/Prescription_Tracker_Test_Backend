const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const adminController = require("../controllers/adminController");

router.use(auth);         // must be logged in
router.use(role("admin")); // must be admin

// GET /api/admin/stats
router.get("/stats", adminController.getStats);

// DELETE /api/admin/user/:id
router.delete("/user/:id", adminController.deleteUser);

module.exports = router;
