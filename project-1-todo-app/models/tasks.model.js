const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must Provide a Name"],
      trim: true,
      maxlength: [20, "Name Length Cannot Be Greater than 20"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Tasks = mongoose.model("tasks", taskSchema);

module.exports = Tasks;
