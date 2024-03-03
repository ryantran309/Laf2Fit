import { toast } from "react-toastify";
import { store } from "../store";
import {
  fetchFood,
  saveFood,
  saveSelectedFood,
  getSelectedFoods as getSelectedFoodsAPI,
  deleteSelectedFood,
} from "../apis/food";
import { addNewFood, updateFoods, updateSelectedFoods } from "../store/foods";

export const getFoods = async () => {
  const { lastFetched } = store.getState().food;
  if (lastFetched) return;

  try {
    const response = await fetchFood();
    store.dispatch(updateFoods(response.data));
  } catch (err) {
    console.log("Error: ", err.response.data);
    const errMsg = err.response?.data?.message ?? err.message;
    toast(errMsg, { type: "error" });

    throw err;
  }
};

export const getSelectedFoods = async () => {
  try {
    const response = await getSelectedFoodsAPI();
    const selectedFoods = response.data.map((item) => ({
      ...item.foodId,
      selectedFoodId: item._id,
    }));
    store.dispatch(updateSelectedFoods(selectedFoods));
  } catch (err) {
    console.log("Error: ", err.response.data);
    const errMsg = err.response?.data?.message ?? err.message;
    toast(errMsg, { type: "error" });

    throw err;
  }
};

export const updateSelectedFood = async (foodId) => {
  // const foods = store.getState().food.list;
  // const food = foods.find((food) => food.foodName === foodName);
  // if (food) {
  //   store.dispatch(updateSelectedFoods(food));
  // }

  try {
    await saveSelectedFood(foodId);
    await getSelectedFoods();
  } catch (err) {
    console.log("Error: ", err.response.data);
    const errMsg = err.response?.data?.message ?? err.message;
    toast(errMsg, { type: "error" });

    throw err;
  }
};

export const saveNewFood = async ({ foodName, calories }) => {
  try {
    const response = await saveFood({ foodName, calories });
    store.dispatch(addNewFood(response.data));
  } catch (err) {
    console.log("Error: ", err.response.data);
    const errMsg = err.response?.data?.message ?? err.message;
    toast(errMsg, { type: "error" });

    throw err;
  }
};

export const removeFood = async (selectedFood) => {
  try {
    const toastId = toast("Please wait, removing food item.", { type: "info" });

    await deleteSelectedFood(selectedFood._id);
    await getSelectedFoods();

    toast.update(toastId, { render: "Successfully removed food item", type: "success" });
  } catch (err) {
    console.log("Error: ", err.response.data);
    const errMsg = err.response?.data?.message ?? err.message;
    toast(errMsg, { type: "error" });

    throw err;
  }
};
