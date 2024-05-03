const mongoose = require("mongoose");

const CurrentLocationSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    currentLocationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'currentLocations', // Assuming you have a collection named 'currentLocations'
      required: true,
    },
    currentLocationName: {
      type: String,
      required: true,
    }
    // Additional fields if necessary
  },
  { timestamps: true }
);

const CurrentLocation = mongoose.model("currentLocation", CurrentLocationSchema);
module.exports = CurrentLocation;
