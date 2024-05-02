const mongoose = require("mongoose");

const RecoveredMaterialSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    recoveredMaterialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'recoveredmaterials',
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

const RecoveredMaterial = mongoose.model("recoveredmaterial", RecoveredMaterialSchema);
module.exports = RecoveredMaterial;
