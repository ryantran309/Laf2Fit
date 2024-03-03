const router = require("express").Router();
const isAuth = require("../middlewares/is-auth");
const scheduleController = require("../controllers/schedule");

router
  .get("/", isAuth, scheduleController.getSchedules)
  .post("/", isAuth, scheduleController.createOrUpdateSchedule)
  .post("/delete", isAuth, scheduleController.deleteSchedule);

module.exports = router;
