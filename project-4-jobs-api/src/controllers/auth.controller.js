const { BadRequestError, ConflictError } = require("../errors/CustomError");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const { generateToken } = require("../utils/user.utils");

const register = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    throw new BadRequestError("Name, Email, or Password Not Present");
  }
  const existingUser = await User.findOne({
    email,
  });
  if (existingUser) {
    throw new ConflictError("User Already Exists");
  }
  const user = await User.create({ name, email, password });
  const token = generateToken({
    userId: user._id,
    name: user.name,
  });
  return res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
    },
    token,
  });
};

const login = (req, res) => {
  res.send("login");
};

module.exports = {
  register,
  login,
};
