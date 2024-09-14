const Product = require("../models/product");
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price");
  res.status(200).json({ nbHits: products.length, products });
};
const getAllProducts = async (req, res) => {
  const {
    name,
    featured,
    rating,
    createdAt,
    company,
    price,
    sort,
    select,
    page,
    limit,
    filter,
  } = req.query;

  queryObject = {};

  if (filter) {
    const operatorMap = {
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
      ">": "$gt",
      ">=": "$gte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = filter.replace(
      regEx,
      (matching) => `-${operatorMap[matching]}-`
    );
    filters = filters.split(",").forEach((item) => {
      const [field, operator, operand] = item.split("-");
      // console.log(field, operator, operand);
      
      queryObject[field] = { [operator]: Number(operand) };
    });
  }
  // console.log(filter, queryObject);

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = Product.find(queryObject);

  if (sort) {
    const keys = sort.split(",").join(" ");
    result = result.sort(keys);
  } else {
    result = result.sort("createdAt");
  }

  if (select) {
    const keys = select.split(",").join(" ");
    result = result.select(keys);
  }

  const pg = page ? Number(page) : 1;
  const lim = limit ? Number(limit) : 10;

  const skip = (pg - 1) * lim;

  result = result.limit(lim).skip(skip);

  const products = await result;

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProductsStatic, getAllProducts };
