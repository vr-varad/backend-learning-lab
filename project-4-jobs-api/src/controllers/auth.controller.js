const register = (req, res) => {
  res.send("register");
};

const login = (req, res) => {
  res.send("login");
};

module.exports = {
  register,
  login,
};
