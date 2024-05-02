const express = require("express");
const app = express();
const unrecoveredmaterial = require("../controller/unrecoveredmaterial");

// Add Unrecovered Material
app.post("/add", unrecoveredmaterial.addUnrecoveredMaterial);

// Get All Unrecovered Materials
app.get("/get/:userId", unrecoveredmaterial.getAllUnrecoveredMaterials);

// Delete Selected Unrecovered Material Item
app.get("/delete/:id", unrecoveredmaterial.deleteSelectedUnrecoveredMaterial);

// Update Selected Unrecovered Material
app.post("/update", unrecoveredmaterial.updateSelectedUnrecoveredMaterial);

// Search Unrecovered Material
app.get("/search", unrecoveredmaterial.searchUnrecoveredMaterial);

module.exports = app;
