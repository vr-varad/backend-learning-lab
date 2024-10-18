const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    msg: "Internel Server Error",
  });
};

module.exports = errorHandlerMiddleware;
