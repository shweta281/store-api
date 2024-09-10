const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  name: {
    type: String,
    required: [true, "please provide a name"],
  },
  price: {
    type: Number,
    require: [true, "please give price"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{value} is not supported"
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
