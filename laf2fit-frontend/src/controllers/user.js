import { store } from "../store";
import { toast } from "react-toastify";
import { updateUser } from "../store/user";
import {
  register as registerAPI,
  login as loginAPI,
  updateProfile as updateProfileAPI,
} from "../apis/user";

export const register = async (userFields) => {
  try {
    await registerAPI(userFields);
    toast("Successfully registered.", { type: "success" });
  } catch (err) {
    console.log("Error: ", err.response.data);
    const errMsg = err.response?.data?.message ?? err.message;
    toast(errMsg, { type: "error" });

    throw err;
  }
};

export const login = async (userFields) => {
  try {
    const response = await loginAPI(userFields);
    toast("Successfully login.", { type: "success" });

    window.localStorage.setItem("token", response.data.user.token);
    store.dispatch(updateUser(response.data.user));
  } catch (err) {
    console.log("Error: ", err.response);
    const errMsg = err.response?.data?.message ?? err.message;
    toast(errMsg, { type: "error" });

    throw err;
  }
};

export const updateProfile = async (userFields) => {
  try {
    await updateProfileAPI(userFields);
    toast("Successfully updated user profile.", { type: "success" });

    delete userFields.password;
    delete userFields.confirmPassword;

    store.dispatch(updateUser(userFields));
  } catch (err) {
    console.log("Error: ", err.response);
    const errMsg = err.response?.data?.message ?? err.message;
    toast(errMsg, { type: "error" });

    throw err;
  }
};

export const updatePlan = async (plan) => {
  const user = store.getState().user;

  try {
    await updateProfileAPI({ ...user, plan });
    toast("Successfully updated user plan.", { type: "success" });

    store.dispatch(updateUser({ ...user, plan }));
  } catch (err) {
    console.log("Error: ", err.response);
    const errMsg = err.response?.data?.message ?? err.message;
    toast(errMsg, { type: "error" });

    throw err;
  }
};
