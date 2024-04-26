const express = require("express");
const app = express();
const client = require("../controller/client");

// Add Product
// app.post("/add", client.addClient);

// Get All Products
 app.get("/get/:userId", client.getAllUser);

// Delete Selected Product Item
// app.get("/delete/:id", client.deleteSelectedProduct);

// Update Selected Product
//app.post("/update", client.updateSelectedProduct);

// Search Product
//app.get("/search", client.searchProduct);

// http://localhost:4000/api/product/search?searchTerm=fa

module.exports = app;
