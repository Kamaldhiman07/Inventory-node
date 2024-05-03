const CurrentLocation = require("../models/currentLocation");

// Add Current Location
const addCurrentLocation = (req, res) => {
    const { currentLocationId, currentLocationName } = req.body;
    const newCurrentLocation = new CurrentLocation({
      currentLocationId,
      currentLocationName,
    });
  
    newCurrentLocation
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.error("Error adding current location:", err);
        res.status(500).send("Internal Server Error");
      });
};
  

// Get All Current Locations for a User
const getAllCurrentLocations = async (req, res) => {
    const userId = req.params.userId;
    try {
      const allCurrentLocations = await CurrentLocation.find({ currentLocationId: userId }).sort({ _id: -1 });
      res.json(allCurrentLocations);
    } catch (error) {
      console.error("Error getting all current locations:", error);
      res.status(500).send("Internal Server Error");
    }
};
  

// Delete Selected Current Location
const deleteSelectedCurrentLocation = async (req, res) => {
    const currentLocationId = req.params.id;
    try {
      const deleteCurrentLocation = await CurrentLocation.deleteOne({ _id: currentLocationId });
      res.json({ deleteCurrentLocation });
    } catch (error) {
      console.error("Error deleting current location:", error);
      res.status(500).send("Internal Server Error");
    }
};
  

// Update Selected Current Location
const updateSelectedCurrentLocation = async (req, res) => {
    const { currentLocationId, currentLocationName } = req.body;
    try {
      const updatedCurrentLocation = await CurrentLocation.findByIdAndUpdate(
        currentLocationId,
        { currentLocationName },
        { new: true }
      );
      res.json(updatedCurrentLocation);
    } catch (error) {
      console.error("Error updating current location:", error);
      res.status(500).send("Internal Server Error");
    }
};
  

// Search Current Locations
const searchCurrentLocations = async (req, res) => {
    const searchTerm = req.query.searchTerm;
    try {
      const currentLocations = await CurrentLocation.find({
        currentLocationName: { $regex: searchTerm, $options: "i" },
      });
      res.json(currentLocations);
    } catch (error) {
      console.error("Error searching current locations:", error);
      res.status(500).send("Internal Server Error");
    }
};
  

module.exports = {
  addCurrentLocation,
  getAllCurrentLocations,
  deleteSelectedCurrentLocation,
  updateSelectedCurrentLocation,
  searchCurrentLocations,
};
