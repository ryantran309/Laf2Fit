import api from ".";

export const fetchFood = () => {
  return api.get("/food");
};

export const saveFood = (foodPayload) => {
  return api.post("/food", foodPayload);
};

export const deleteFood = (foodId) => {
  return api.delete("/food/" + foodId);
};

export const getSelectedFoods = () => {
  return api.get("/selected-food");
};

export const saveSelectedFood = (foodId) => {
  return api.post("/selected-food", { foodId });
};

export const deleteSelectedFood = (selectedFoodId) => {
  return api.delete("/selected-food/" + selectedFoodId);
};
