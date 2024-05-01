const express = require("express");
const app = express();
const recoveredmaterial = require("../controller/recoveredmaterial");

// Add Product
app.post("/add", recoveredmaterial.addRecoveredMaterial);

// Get All Products
app.get("/get/:userId", recoveredmaterial.getAllRecoveredMaterials);

// Delete Selected Product Item
app.get("/delete/:id", recoveredmaterial.deleteSelectedRecoveredMaterial);

// Update Selected Product
app.post("/update", recoveredmaterial.updateSelectedRecoveredMaterial);

// Search Product
app.get("/search", recoveredmaterial.searchRecoveredMaterial);

module.exports = app;
