const OS = require("../models/os");

// Add Post
const addOs = (req, res) => {
    console.log("req: ", req.body);
    const addOs = new OS({
      osId: req.body.osId,
      name: req.body.name,
    });
  
    addOs
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(402).send(err);
      });
  };
  

// Get All Products
const getAllOs = async (req, res) => {
    const findAllMakes = await OS.find({
      osID: req.params.osId,
    }).sort({ _id: -1 }); // -1 for descending;
    res.json(findAllOs);
  };
  

// Delete Selected Product
const deleteSelectedOs = async (req, res) => {
    const deleteOs = await OS.deleteOne(
      { _id: req.params.id }
    );
    // Additional deletion logic for related data if necessary
    
    res.json({ deleteOs });
  };
  

// Update Selected Product
const updateSelectedos = async (req, res) => {
    try {
      const updatedResult = await OS.findByIdAndUpdate(
        { _id: req.body.osID },
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
  

// Search Products
const searchOs = async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const os = await OS.find({
      name: { $regex: searchTerm, $options: "i" },
    });
    res.json(os);
  };
  

module.exports = {
  addOs,
  getAllOs,
  deleteSelectedOs,
  updateSelectedos,
  searchOs,
};
