const express = require("express");
const app = express();
const store = require("../controller/device");

// Add Store 
app.get("/delete/:userID", store.deleteSelected)
app.post("/add", store.addStore);
app.post("/update", store.updateSelected);
// Get All Store
app.get("/get/:userID", store.getAllStores)


module.exports = app;
