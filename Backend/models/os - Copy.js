const mongoose = require("mongoose");

const OsSchema = new mongoose.Schema(
  {
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    osId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'os',
      required: false,
    },
    name: { // Corrected field name
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);


const Operatingsystem = mongoose.model("os", OsSchema);
module.exports = Operatingsystem;
