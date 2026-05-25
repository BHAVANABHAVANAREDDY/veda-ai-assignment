const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    dueDate: {
      type: String
    },
    questionType: {
      type: String
    },
    numberOfQuestions: {
      type: Number
    },
    marks: {
      type: Number
    },
    instructions: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Assignment", assignmentSchema);