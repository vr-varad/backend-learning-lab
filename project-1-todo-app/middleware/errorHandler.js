const { CustomAPIError } = require("../error/custom-error");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  console.log(err instanceof CustomAPIError);
  if (err instanceof CustomAPIError) {
    return res.status(err.statuscode).json({
      msg: err.message,
    });
  }
  return res.status(500).json({
    msg: "Internal Server Error",
  });
};

module.exports = errorHandler;
