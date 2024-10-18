const notFound = (req, res) => {
  res.status(404).send("Not Found Error");
};

module.exports = notFound;
