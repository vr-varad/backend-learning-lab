const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    msg: "Page Not Found",
  });
};

module.exports = notFoundMiddleware;
