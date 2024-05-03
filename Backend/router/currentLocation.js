const express = require("express");
const app = express();
const currentLocationController = require("../controller/currentLocation"); // Assuming you have a controller for current locations

// Add Current Location
app.post("/add", currentLocationController.addCurrentLocation);

// Get All Current Locations for a User
app.get("/get/:userId", currentLocationController.getAllCurrentLocations);

// Delete Selected Current Location
app.get("/delete/:id", currentLocationController.deleteSelectedCurrentLocation);

// Update Selected Current Location
app.post("/update", currentLocationController.updateSelectedCurrentLocation);

// Search Current Locations
app.get("/search", currentLocationController.searchCurrentLocations);

module.exports = app;
