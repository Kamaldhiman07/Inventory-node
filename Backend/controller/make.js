const Make = require("../models/make");

// Add Post
const addMake = (req, res) => {
    console.log("req: ", req.body.makeId);
    const addMake = new Make({
      makeId: req.body.makeId,
      name: req.body.name,
    });
  
    addMake
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(402).send(err);
      });
  };
  

// Get All Products
const getAllMakes = async (req, res) => {
    const findAllMakes = await Make.find({
      makeID: req.params.makeId,
    }).sort({ _id: -1 }); // -1 for descending;
    res.json(findAllMakes);
  };
  

// Delete Selected Product
const deleteSelectedMake = async (req, res) => {
    const deleteMake = await Make.deleteOne(
      { _id: req.params.id }
    );
    // Additional deletion logic for related data if necessary
    
    res.json({ deleteMake });
  };
  

// Update Selected Product
const updateSelectedMake = async (req, res) => {
    try {
      const updatedResult = await Make.findByIdAndUpdate(
        { _id: req.body.makeID },
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
const searchMake = async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const makes = await Make.find({
      name: { $regex: searchTerm, $options: "i" },
    });
    res.json(makes);
  };
  

module.exports = {
  addMake,
  getAllMakes,
  deleteSelectedMake,
  updateSelectedMake,
  searchMake,
};
