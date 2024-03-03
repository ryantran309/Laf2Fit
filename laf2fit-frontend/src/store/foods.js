import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "food",
  initialState: { isLoading: false, lastFetched: undefined, list: [], selectedFoods: [] },
  reducers: {
    updateLoading(state, actions) {
      state.isLoading = actions.payload;
    },
    updateFoods(state, actions) {
      state.list = actions.payload;
      state.lastFetched = new Date().getTime();
      state.isLoading = false;
    },
    updateSelectedFoods(state, actions) {
      state.selectedFoods = actions.payload;
    },
    addNewFood(state, actions) {
      state.list.push(actions.payload);
    },
    removeSelectedFood(state, actions) {
      const filteredFoods = state.selectedFoods.filter((food) => food.foodName !== actions.payload);
      state.selectedFoods = filteredFoods;
    },
    invalidateCache(state) {
      state.lastFetched = undefined;
    },
  },
});

export const {
  updateLoading,
  updateFoods,
  updateSelectedFoods,
  addNewFood,
  removeSelectedFood,
  invalidateCache,
} = foodSlice.actions;
export default foodSlice.reducer;
