const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name for the Product is Required"],
    },
    price: {
      type: Number,
      required: [true, "Price for the Product is Required"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    company: {
      type: String,
      enum: {
        values: ["comp1", "comp2", "comp3", "comp4", "comp5"],
        message: `{VALUE} is not supported`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const products = mongoose.model("products", productSchema);

module.exports = products;
