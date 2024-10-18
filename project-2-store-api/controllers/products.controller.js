const Product = require("../models/products.model");

const getAllProducts = async (req, res) => {
  const { featured, name, company, sort, field, numericFilters } = req.query;
  const queryObject = {};
  console.log(numericFilters);
  if (featured) queryObject.featured = featured;
  if (company) queryObject.company = company;
  if (name) queryObject.name = { $regex: name, $options: "i" };
  if (numericFilters) {
    const operators = {
      "<": "$lt",
      "<=": "$lte",
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
    };
    const regEX = /\b(<|>|<=|>=|=)\b/g;
    let filters = String(numericFilters).replace(
      regEX,
      (match) => `-${operators[match]}-`
    );
    const fields = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = String(item).split("-");
      if (fields.includes(field)) {
        queryObject[field] = { [operator]: value };
      }
    });
  }
  let results = Product.find(queryObject);

  if (sort) {
    const sortBy = String(sort).split(",").join(" ");
    results.sort(sortBy);
  } else {
    results.sort("createdAt");
  }

  if (field) {
    const fields = String(field).split(",").join(" ");
    results.select(fields);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.page) || 10;
  const skip = (page - 1) * limit;
  results = results.skip(skip).limit(limit);

  const products = await results;
  res.status(200).json({
    products,
    nProducts: products.length,
  });
};

module.exports = {
  getAllProducts,
};
