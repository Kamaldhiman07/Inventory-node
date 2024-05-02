const Model = require("../models/model");

// Add Model
const addModel = (req, res) => {
    console.log("req: ", req.body.modelId);
    const newModel = new Model({
      modelId: req.body.modelId,
      modelName: req.body.modelName,
    });
  
    newModel
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(402).send(err);
      });
  };
  

// Get All Models
const getAllModels = async (req, res) => {
    const allModels = await Model.find({
      userId: req.params.userId,
    }).sort({ _id: -1 }); // -1 for descending;
    res.json(allModels);
};
  

// Delete Selected Model
const deleteSelectedModel = async (req, res) => {
    const deleteModel = await Model.deleteOne(
      { _id: req.params.id }
    );
    // Additional deletion logic for related data if necessary    
    res.json({ deleteModel });
  };
  

// Update Selected Model
const updateSelectedModel = async (req, res) => {
    try {
      const updatedModel = await Model.findByIdAndUpdate(
        { _id: req.body.modelId },
        {
          modelName: req.body.modelName,
          // Additional fields to update if necessary
        },
        { new: true }
      );
      console.log(updatedModel);
      res.json(updatedModel);
    } catch (error) {
      console.log(error);
      res.status(402).send("Error");
    }
};
  

// Search Models
const searchModels = async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const models = await Model.find({
      modelName: { $regex: searchTerm, $options: "i" },
    });
    res.json(models);
};
  

module.exports = {
  addModel,
  getAllModels,
  deleteSelectedModel,
  updateSelectedModel,
  searchModels,
};
