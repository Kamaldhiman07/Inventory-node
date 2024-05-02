const mongoose = require("mongoose");

const UnrecoveredMaterialSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    unrecoveredMaterialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'unrecoveredmaterials',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    // Additional fields if necessary
  },
  { timestamps: true }
);

const UnrecoveredMaterial = mongoose.model("unrecoveredmaterial", UnrecoveredMaterialSchema);
module.exports = UnrecoveredMaterial;
