const mongoose = require("mongoose");

const ConditionSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    conditionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conditions', // Assuming you have a collection named 'conditions'
      required: true,
    },
    conditionName: {
      type: String,
      required: true,
    }
    // Additional fields if necessary
  },
  { timestamps: true }
);

const Condition = mongoose.model("condition", ConditionSchema);
module.exports = Condition;
