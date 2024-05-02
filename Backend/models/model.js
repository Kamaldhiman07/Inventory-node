const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    modelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'models',
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    }
    // Additional fields if necessary
  },
  { timestamps: true }
);

const Model = mongoose.model("model", ModelSchema);
module.exports = Model;
