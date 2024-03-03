import { store } from "../store";
import { getProfile } from "../apis/user";
import { updateUser } from "../store/user";

export const initAppLoad = async () => {
  const token = window.localStorage.getItem("token");
  if (!token) {
    store.dispatch(updateUser({ isLoggedIn: false }));
    return;
  }

  try {
    const response = await getProfile();
    console.log("response: ", response.data);
    store.dispatch(updateUser(response.data));
  } catch (err) {
    console.log("error: ", err);
  }
};
