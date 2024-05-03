const express = require("express");
const router = express.Router();
const osController = require("../controller/os");

// Add Operating System
router.post("/add", osController.addOs); 

// router.get("/get/:userId", osController.getAllOs);

// // Delete Selected Operating System
// router.get("/delete/:id", osController.deleteSelectedOs);

// // Update Selected Operating System
// router.post("/update", osController.updateSelectedOs);

// // Search Operating Systems
// router.get("/search", osController.searchOs);

module.exports = router;
