const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


const Tasks =  mongoose.model('tasks', taskSchema)

module.exports = Tasks