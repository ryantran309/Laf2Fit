import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    weight: 0,
    height: 0,
    isLoggedIn: true,
    plan: "",
  },
  reducers: {
    updateUser(state, actions) {
      return { ...state, ...actions.payload };
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
