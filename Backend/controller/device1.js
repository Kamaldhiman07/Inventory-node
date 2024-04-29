const Store = require("../models/device");

// Add Store
const addDevice = async (req, res) => {
    console.log(req.body)
  const addDevice = await new Store({
    userID : req.body.userId,
    devicename: req.body.devicename,
  });

  addDevice.save().then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

// Get All Stores
const getAllStores = async (req, res) => {
  const findAllStores = await Store.find({"userID": req.params.userID}).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllStores);
};

module.exports = { addDevice, getAllStores };
