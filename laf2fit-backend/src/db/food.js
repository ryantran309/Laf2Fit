const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodName: String,
  calories: Number,
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
