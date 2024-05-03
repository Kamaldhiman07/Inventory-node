const mongoose = require("mongoose");

const GradeSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    gradeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'grades',
      required: true,
    },
    gradeName: {
      type: String,
      required: true,
    }
    // Additional fields if necessary
  },
  { timestamps: true }
);

const Grade = mongoose.model("grade", GradeSchema);
module.exports = Grade;
