const User = require("../db/user");
const Schedule = require("../db/schedule");
const Errors = require("../libs/custom-errors");

/**
 * @typedef {{
 *  day: string
 *  name: string
 *  userId: string
 *  isEdit: boolean
 *  scheduleId?: string
 *  repCount: string
 * }} Schedule
 */

/**
 * @param {Schedule} payload
 */
async function _createNewScheduleForUser(payload) {
  const { userId, day, name, scheduleId, plan, repCount } = payload;
  return Schedule.create({
    isGeneral: false,
    userId,
    scheduleId,
    day,
    name,
    plan,
    repCount,
  });
}

/**
 * @param {Schedule} payload
 */
async function createOrUpdateSchedule(payload) {
  const { scheduleId, isEdit, name, userId, day, repCount } = payload;

  const userInDb = await User.findById(userId);
  if (!userInDb) throw new Errors.BadRequestError("User is not found");

  if (isEdit) {
    if (!scheduleId)
      throw new Errors.BadRequestError("Schedule ID is not found");

    const schedule = await Schedule.findById(scheduleId);
    if (schedule.isGeneral) {
      return _createNewScheduleForUser({ ...payload, plan: userInDb.plan });
    }

    schedule.name = name;
    schedule.repCount = repCount ?? schedule.repCount;
    return schedule.save();
  }

  return Schedule.create({
    isGeneral: false,
    userId,
    day,
    name,
    plan: userInDb.plan,
    repCount,
  });
}

/**
 * @param {{
 *  scheduleId: string
 *  userId: string
 * }} payload
 */
async function deleteSchedule(payload) {
  const { userId, scheduleId } = payload;

  const scheduleInDb = await Schedule.findById(scheduleId);
  if (!scheduleInDb) throw new Errors.BadRequestError("Schedule is not found");

  if (!scheduleInDb.isGeneral) {
    scheduleInDb.isDeleted = true;
    await scheduleInDb.save();
    return;
  }

  await Schedule.create({
    scheduleId,
    isGeneral: true,
    userId,
    isDeleted: true,
    plan: scheduleInDb.plan,
  });
}

/**
 * @param {{ userId: string }} payload
 */
async function listSchedules(payload) {
  const { userId } = payload;

  const userInDb = await User.findById(userId);
  if (!userInDb) throw new Errors.BadRequestError("User is not found");

  return Schedule.find({
    $and: [
      { $or: [{ userId }, { isGeneral: true }, { isDeleted: true }] },
      { plan: userInDb.plan },
    ],
  });
}

module.exports = { createOrUpdateSchedule, listSchedules, deleteSchedule };
