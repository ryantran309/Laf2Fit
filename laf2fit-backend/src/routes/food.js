const router = require("express").Router();
const foodController = require("../controllers/food");

router.get("/", foodController.getFoods).post("/", foodController.newFood);

module.exports = router;
