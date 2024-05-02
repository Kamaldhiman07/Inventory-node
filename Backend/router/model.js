const express = require("express");
const app = express();
const models = require("../controller/model");

// Add Model
app.post("/add", models.addModel);

// Get All Models
app.get("/get/:userId", models.getAllModels);

// Delete Selected Model Item
app.get("/delete/:id", models.deleteSelectedModel);

// Update Selected Model
app.post("/update", models.updateSelectedModel);

// Search Models
app.get("/search", models.searchModels);

module.exports = app;
