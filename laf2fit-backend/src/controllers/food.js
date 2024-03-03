const foodRepo = require("../repositories/food");

async function getFoods(_, res) {
  const foods = await foodRepo.getFoods();
  res.send(foods);
}

async function newFood(req, res) {
  const food = await foodRepo.newFood(req.body);
  res.send(food);
}

module.exports = { getFoods, newFood };
