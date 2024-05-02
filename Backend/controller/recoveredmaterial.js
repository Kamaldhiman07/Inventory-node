const RecoveredMaterial = require("../models/recoveredmaterial");

// Add RecoveredMaterial
const addRecoveredMaterial = (req, res) => {
    console.log("req: ", req.body.recoveredMaterialId);
    const addRecoveredMaterial = new RecoveredMaterial({
      recoveredMaterialId: req.body.recoveredMaterialId,
      name: req.body.name,
    });
  
    addRecoveredMaterial
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(402).send(err);
      });
  };
  

// Get All RecoveredMaterials
const getAllRecoveredMaterials = async (req, res) => {
    const findAllRecoveredMaterials = await RecoveredMaterial.find({
      recoveredMaterialID: req.params.recoveredMaterialId,
    }).sort({ _id: -1 }); // -1 for descending;
    res.json(findAllRecoveredMaterials);
};
  

// Delete Selected RecoveredMaterial
const deleteSelectedRecoveredMaterial = async (req, res) => {
    const deleteRecoveredMaterial = await RecoveredMaterial.deleteOne(
      { _id: req.params.id }
    );
    // Additional deletion logic for related data if necessary    
    res.json({ deleteRecoveredMaterial });
  };
  

// Update Selected RecoveredMaterial
const updateSelectedRecoveredMaterial = async (req, res) => {
    try {
      const updatedResult = await RecoveredMaterial.findByIdAndUpdate(
        { _id: req.body.recoveredMaterialId },
        {
          name: req.body.name,
          // Additional fields to update if necessary
        },
        { new: true }
      );
      console.log(updatedResult);
      res.json(updatedResult);
    } catch (error) {
      console.log(error);
      res.status(402).send("Error");
    }
};
  

// Search RecoveredMaterials
const searchRecoveredMaterial = async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const recoveredMaterials = await RecoveredMaterial.find({
      name: { $regex: searchTerm, $options: "i" },
    });
    res.json(recoveredMaterials);
};
  

module.exports = {
  addRecoveredMaterial,
  getAllRecoveredMaterials,
  deleteSelectedRecoveredMaterial,
  updateSelectedRecoveredMaterial,
  searchRecoveredMaterial,
};
