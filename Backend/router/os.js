const express = require("express");
const app = express();
const make = require("../controller/os");

// Add Product
app.post("/add", make.addMake);

// Get All Products
app.get("/get/:userId", make.getAllMakes);

// Delete Selected Product Item
app.get("/delete/:id", make.deleteSelectedMake);

// Update Selected Product
app.post("/update", make.updateSelectedMake);

// Search Product
app.get("/search", make.searchMake);

module.exports = app;
