import api from ".";

export const listSchedules = async () => {
  return api.get("/schedule");
};

export const newSchedule = async (schedulePayload) => {
  return api.post("/schedule", schedulePayload);
};

export const deleteSchedule = async (schedulePayload) => {
  return api.post("/schedule/delete", schedulePayload);
};
