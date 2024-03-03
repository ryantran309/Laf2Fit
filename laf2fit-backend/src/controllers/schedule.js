const libs = require("../libs/list-schedules");
const scheduleRepo = require("../repositories/schedule");

async function getSchedules(req, res) {
  const schedules = await scheduleRepo.listSchedules({ userId: req.user._id });
  const overrideSchedules = schedules.filter((schedule) => schedule.scheduleId);

  libs.deleteOverrideSchedules(schedules, overrideSchedules);
  const filteredSchedules = schedules.filter((schedule) => !schedule.isDeleted);

  const { schedulesMap, maxEntriesCount } =
    libs.makeResponseForSchedules(filteredSchedules);

  res.send({ schedules: schedulesMap, maxEntriesCount });
}

async function createOrUpdateSchedule(req, res) {
  const schedule = await scheduleRepo.createOrUpdateSchedule({
    ...req.body,
    userId: req.user._id,
  });
  res.send(schedule);
}

async function deleteSchedule(req, res) {
  await scheduleRepo.deleteSchedule({ ...req.body, userId: req.user._id });
  res.send("Successfully deleted schedule");
}

module.exports = { getSchedules, createOrUpdateSchedule, deleteSchedule };
