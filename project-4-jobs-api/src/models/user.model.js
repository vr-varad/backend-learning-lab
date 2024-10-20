const mongoose = require("mongoose");
const { generatePassword } = require("../utils/user.utils");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Name"],
    minlength: 6,
    maxlenght: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Provide Email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a Valid Email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
  },
});

userSchema.pre("save", async function (next) {
  this.password = await generatePassword(this.password);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
