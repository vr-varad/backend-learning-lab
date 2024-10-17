class CustomAPIError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
  }
}

const NotFoundError = (msg) => {
  return new CustomAPIError(msg, 404);
};

module.exports = {
  CustomAPIError,
  NotFoundError,
};
