import { createSlice } from "@reduxjs/toolkit";

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    isLoading: false,
    data: { schedules: {}, maxEntriesCount: 0, lastFetched: undefined },
  },
  reducers: {
    updateLoading(state, actions) {
      state.isLoading = actions.payload;
    },
    updateSchedules(state, actions) {
      const { schedules, maxEntriesCount } = actions.payload;

      state.data.schedules = schedules;
      state.data.maxEntriesCount = maxEntriesCount;
      state.isLoading = false;
      state.data.lastFetched = new Date().getTime();
    },
    addNewSchedule(state, actions) {
      const schedule = actions.payload;
      state.data.schedules[schedule.day].push(schedule);
    },
  },
});

export const { updateLoading, updateSchedules, addNewSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;
