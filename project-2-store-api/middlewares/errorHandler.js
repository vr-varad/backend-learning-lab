const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    msg: "Something went wrong, please try again.",
  });
};

module.exports = { errorHandlerMiddleware };
