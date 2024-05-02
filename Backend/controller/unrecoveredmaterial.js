const UnrecoveredMaterial = require("../models/unrecoveredmaterial");

// Add UnrecoveredMaterial
const addUnrecoveredMaterial = (req, res) => {
    console.log("req: ", req.body.unrecoveredMaterialId);
    const addUnrecoveredMaterial = new UnrecoveredMaterial({
      unrecoveredMaterialId: req.body.unrecoveredMaterialId,
      name: req.body.name,
    });
  
    addUnrecoveredMaterial
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(402).send(err);
      });
  };
  

// Get All UnrecoveredMaterials
const getAllUnrecoveredMaterials = async (req, res) => {
    const findAllUnrecoveredMaterials = await UnrecoveredMaterial.find({
      unrecoveredMaterialID: req.params.unrecoveredMaterialId,
    }).sort({ _id: -1 }); // -1 for descending;
    res.json(findAllUnrecoveredMaterials);
};
  

// Delete Selected UnrecoveredMaterial
const deleteSelectedUnrecoveredMaterial = async (req, res) => {
    const deleteUnrecoveredMaterial = await UnrecoveredMaterial.deleteOne(
      { _id: req.params.id }
    );
    // Additional deletion logic for related data if necessary    
    res.json({ deleteUnrecoveredMaterial });
  };
  

// Update Selected UnrecoveredMaterial
const updateSelectedUnrecoveredMaterial = async (req, res) => {
    try {
      const updatedResult = await UnrecoveredMaterial.findByIdAndUpdate(
        { _id: req.body.unrecoveredMaterialId },
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
  

// Search UnrecoveredMaterials
const searchUnrecoveredMaterial = async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const unrecoveredMaterials = await UnrecoveredMaterial.find({
      name: { $regex: searchTerm, $options: "i" },
    });
    res.json(unrecoveredMaterials);
};
  

module.exports = {
  addUnrecoveredMaterial,
  getAllUnrecoveredMaterials,
  deleteSelectedUnrecoveredMaterial,
  updateSelectedUnrecoveredMaterial,
  searchUnrecoveredMaterial,
};
