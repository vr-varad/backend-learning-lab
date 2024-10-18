const notFoundMiddlware = (req, res) =>
  res.status(404).send("Route Doesn't Exist");

module.exports = notFoundMiddlware;
