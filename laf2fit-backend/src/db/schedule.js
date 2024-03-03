const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  name: String,
  day: String, // e.g. Monday, Tuesday, Wednesday etc..
  isGeneral: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  scheduleId: { type: mongoose.Schema.Types.ObjectId },
  plan: String,
  isDeleted: Boolean,
  repCount: String,
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
