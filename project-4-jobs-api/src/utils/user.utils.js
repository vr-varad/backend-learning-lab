const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET || "jwt_secret", {
    expiresIn: "30d",
  });
  return token
};

module.exports = {
  generatePassword,
  generateToken
};
