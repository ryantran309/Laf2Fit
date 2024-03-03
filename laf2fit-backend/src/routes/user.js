const router = require("express").Router();
const isAuth = require("../middlewares/is-auth");
const userController = require("../controllers/user");

router
  .get("/profile", isAuth, userController.profile)
  .patch("/profile", isAuth, userController.updateProfile);

module.exports = router;
