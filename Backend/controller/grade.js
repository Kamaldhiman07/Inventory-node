const Grade = require("../models/grade");

// Add Grade
const addGrade = (req, res) => {
    console.log("req: ", req.body.gradeId);
    const newGrade = new Grade({
      gradeId: req.body.gradeId,
      gradeName: req.body.gradeName,
    });
  
    newGrade
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(402).send(err);
      });
  };
  

// Get All Grades
const getAllGrades = async (req, res) => {
    const allGrades = await Grade.find({
      gradeId: req.params.userId,
    }).sort({ _id: -1 }); // -1 for descending;
    res.json(allGrades);
};
  

// Delete Selected Grade
const deleteSelectedGrade = async (req, res) => {
    const deleteGrade = await Grade.deleteOne(
      { _id: req.params.id }
    );
    // Additional deletion logic for related data if necessary    
    res.json({ deleteGrade });
  };
  

// Update Selected Grade
const updateSelectedGrade = async (req, res) => {
    try {
      const updatedGrade = await Grade.findByIdAndUpdate(
        { _id: req.body.gradeId },
        {
          gradeName: req.body.gradeName,
          // Additional fields to update if necessary
        },
        { new: true }
      );
      console.log(updatedGrade);
      res.json(updatedGrade);
    } catch (error) {
      console.log(error);
      res.status(402).send("Error");
    }
};
  

// Search Grades
const searchGrades = async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const grades = await Grade.find({
      gradeName: { $regex: searchTerm, $options: "i" },
    });
    res.json(grades);
};
  

module.exports = {
  addGrade,
  getAllGrades,
  deleteSelectedGrade,
  updateSelectedGrade,
  searchGrades,
};
