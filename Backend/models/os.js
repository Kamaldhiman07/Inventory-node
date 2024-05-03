
const mongoose = require("mongoose");

const MakeSchema = new mongoose.Schema(
  {
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    osId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'makes',
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

const Make = mongoose.model("os", MakeSchema);
module.exports = Make;
