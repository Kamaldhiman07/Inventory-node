const express = require("express");
const app = express();
const conditionController = require("../controller/condition"); // Assuming you have a controller for conditions

// Add Condition
app.post("/add", conditionController.addCondition);

// Get All Conditions
app.get("/get/:userId", conditionController.getAllConditions);

// Delete Selected Condition Item
app.get("/delete/:id", conditionController.deleteSelectedCondition);

// Update Selected Condition
app.post("/update", conditionController.updateSelectedCondition);

// Search Conditions
app.get("/search", conditionController.searchConditions);

module.exports = app;
