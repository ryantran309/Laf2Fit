const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");
const foodRoutes = require("./food");
const scheduleRoutes = require("./schedule");

router.get("/", (_req, res) => res.json({ message: "GYM Api" }));
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/food", foodRoutes);
router.use("/schedule", scheduleRoutes);

module.exports = router;
