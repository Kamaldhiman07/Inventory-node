const express = require("express");
const app = express();
const recoveredmaterial = require("../controller/recoveredmaterial");

// Add Product
app.post("/add", recoveredmaterial.addAddRecoveredMaterial);

// Get All Products
app.get("/get/:userId", recoveredmaterial.getAllAddRecoveredMaterial);

// Delete Selected Product Item
app.get("/delete/:id", recoveredmaterial.deleteSelectedAddRecoveredMaterial);

// Update Selected Product
app.post("/update", recoveredmaterial.updateSelectedAddRecoveredMaterial);

// Search Product
app.get("/search", recoveredmaterial.searchAddRecoveredMaterial);

module.exports = app;
