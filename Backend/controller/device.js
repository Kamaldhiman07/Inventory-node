const Store = require("../models/device");

// Add Store
const addStore = async (req, res) => {
    console.log(req.body)
  const addStore = await new Store({
    userID : req.body.userId,
    devicename: req.body.devicename,
  });

  addStore.save().then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    }); 
};
// Update Selected Product
const updateSelected = async (req, res) => {
  
  try {
    const updatedResult = await Store.findByIdAndUpdate(
      { _id: req.body.userId },
      {
        devicename: req.body.devicename,
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
const deleteSelected = async (req, res) => {
  try {
    const deletedProduct = await Store.deleteOne({ _id: req.params.userID });
    if (deletedProduct.deletedCount === 0) {
      return res.status(404).json({ error: "Device not found" });
    }
    res.json({ message: "Device deleted successfully" });
  } catch (error) {
    console.error("Error deleting device:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// const deleteDeviceController = async (req, res) => {
//   try {
//     const deletedDevice = await Store.findByIdAndDelete(req.params.deviceId);
//     if (!deletedDevice) {
//       return res.status(404).json({ error: "Device not found" });
//     }
//     res.status(200).json({ message: "Device deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting device:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// Get All Stores
const getAllStores = async (req, res) => {
  const findAllStores = await Store.find({"userID": req.params.userID}).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllStores);
};

module.exports = { addStore, getAllStores ,deleteSelected,updateSelected};
