import { toast } from "react-toastify";
import { store } from "../store";
import { updateSchedules } from "../store/schedule";
import {
  listSchedules as listSchedulesAPI,
  newSchedule,
  deleteSchedule as deleteScheduleAPI,
} from "../apis/schedule";

export const listSchedules = async () => {
  try {
    const response = await listSchedulesAPI();
    const { schedules, maxEntriesCount } = response.data;
    store.dispatch(updateSchedules({ schedules, maxEntriesCount }));
  } catch (err) {
    console.log("Error: ", err.response.data);
    const errMsg = err.response?.data?.message ?? err.message;
    toast(errMsg, { type: "error" });
  }
};

export const saveSchedule = async ({ name, day, repCount }) => {
  try {
    await newSchedule({ name, day, isEdit: false, repCount });
    await listSchedules();
  } catch (err) {
    console.log("Error: ", err);
    const errMsg = err.response?.data?.message ?? err.message;
    toast(errMsg, { type: "error" });
    throw err;
  }
};

export const updateSchedule = async (schedule) => {
  try {
    const { _id, name, day, repCount } = schedule;
    const editPayload = { scheduleId: _id, name, day, isEdit: true, repCount };
    await newSchedule(editPayload);
    await listSchedules();
  } catch (err) {
    console.log("Error: ", err);
    const errMsg = err.response?.data?.message ?? err.message;
    toast(errMsg, { type: "error" });
    throw err;
  }
};

export const deleteSchedule = async (schedule) => {
  try {
    const { _id } = schedule;
    const editPayload = { scheduleId: _id, isDeleted: true };
    await deleteScheduleAPI(editPayload);
    await listSchedules();
  } catch (err) {
    console.log("Error: ", err);
    const errMsg = err.response?.data?.message ?? err.message;
    toast(errMsg, { type: "error" });
    throw err;
  }
};
