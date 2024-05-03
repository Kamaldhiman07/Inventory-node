const Condition = require("../models/condition");

// Add Condition
const addCondition = (req, res) => {
    const { conditionId, conditionName } = req.body;
    const newCondition = new Condition({
      conditionId,
      conditionName,
    });
  
    newCondition
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.error("Error adding condition:", err);
        res.status(500).send("Internal Server Error");
      });
};
  

// Get All Conditions
const getAllConditions = async (req, res) => {
    const userId = req.params.userId;
    try {
      const allConditions = await Condition.find({ conditionId: userId }).sort({ _id: -1 });
      res.json(allConditions);
    } catch (error) {
      console.error("Error getting all conditions:", error);
      res.status(500).send("Internal Server Error");
    }
};
  

// Delete Selected Condition
const deleteSelectedCondition = async (req, res) => {
    const conditionId = req.params.id;
    try {
      const deleteCondition = await Condition.deleteOne({ _id: conditionId });
      res.json({ deleteCondition });
    } catch (error) {
      console.error("Error deleting condition:", error);
      res.status(500).send("Internal Server Error");
    }
};
  

// Update Selected Condition
const updateSelectedCondition = async (req, res) => {
    const { conditionId, conditionName } = req.body;
    try {
      const updatedCondition = await Condition.findByIdAndUpdate(
        conditionId,
        { conditionName },
        { new: true }
      );
      res.json(updatedCondition);
    } catch (error) {
      console.error("Error updating condition:", error);
      res.status(500).send("Internal Server Error");
    }
};
  

// Search Conditions
const searchConditions = async (req, res) => {
    const searchTerm = req.query.searchTerm;
    try {
      const conditions = await Condition.find({
        conditionName: { $regex: searchTerm, $options: "i" },
      });
      res.json(conditions);
    } catch (error) {
      console.error("Error searching conditions:", error);
      res.status(500).send("Internal Server Error");
    }
};
  

module.exports = {
  addCondition,
  getAllConditions,
  deleteSelectedCondition,
  updateSelectedCondition,
  searchConditions,
};
