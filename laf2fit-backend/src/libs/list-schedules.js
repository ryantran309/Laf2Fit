function deleteOverrideSchedules(schedules, overrideSchedules) {
  overrideSchedules.forEach((schedule) => {
    const idx = schedules.findIndex(
      (sch) => sch._id.toString() === schedule.scheduleId?.toString()
    );
    if (idx !== -1) {
      schedules.splice(idx, 1);
    }
  });
}

function makeResponseForSchedules(schedules) {
  const maxEntries = {};
  const schedulesMap = {};
  schedules.forEach((schedule) => {
    const { day } = schedule;

    if (!schedulesMap[day]) {
      schedulesMap[day] = new Array(schedule);
      maxEntries[day] = 1;
    } else {
      schedulesMap[day].push(schedule);
      maxEntries[day] += 1;
    }
  });

  let maxEntriesCount = 0;
  Object.values(maxEntries).forEach((count) => {
    maxEntriesCount = Math.max(count, maxEntriesCount);
  });

  if (!schedulesMap.Monday) schedulesMap.Monday = [];
  if (!schedulesMap.Tuesday) schedulesMap.Tuesday = [];
  if (!schedulesMap.Wednesday) schedulesMap.Wednesday = [];
  if (!schedulesMap.Thursday) schedulesMap.Thursday = [];
  if (!schedulesMap.Friday) schedulesMap.Friday = [];
  if (!schedulesMap.Saturday) schedulesMap.Saturday = [];
  if (!schedulesMap.Sunday) schedulesMap.Sunday = [];

  return { schedulesMap, maxEntriesCount };
}

module.exports = { deleteOverrideSchedules, makeResponseForSchedules };
