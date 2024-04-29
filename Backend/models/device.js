const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    devicename: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Device = mongoose.model("device", DeviceSchema);
module.exports = Device;
