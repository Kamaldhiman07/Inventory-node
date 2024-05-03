const express = require("express");
const app = express();
const grades = require("../controller/grade");

// Add Grade
app.post("/add", grades.addGrade);

// Get All Grades
app.get("/get/:userId", grades.getAllGrades);

// Delete Selected Grade Item
app.get("/delete/:id", grades.deleteSelectedGrade);

// Update Selected Grade
app.post("/update", grades.updateSelectedGrade);

// Search Grades
app.get("/search", grades.searchGrades);

module.exports = app;
