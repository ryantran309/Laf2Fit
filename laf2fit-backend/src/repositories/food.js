const Food = require("../db/food");

async function getFoods() {
  return Food.find({});
}

/**
 * @param {{
 *  foodName: string
 *  calories: number
 * }} food
 */
async function newFood(food) {
  return Food.create(food);
}

module.exports = { getFoods, newFood };
