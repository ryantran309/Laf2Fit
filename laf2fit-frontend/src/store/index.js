import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import foodSlice from "./foods";
import scheduleSlice from "./schedule";

export const store = configureStore({
  reducer: { user: userSlice, schedule: scheduleSlice, food: foodSlice },
});
