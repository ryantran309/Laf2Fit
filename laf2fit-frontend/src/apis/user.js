import api from ".";

export const getProfile = async () => {
  return api.get("/user/profile");
};

export const updateProfile = async (userFields) => {
  return api.patch("/user/profile", userFields);
};

export const register = async (userFields) => {
  return api.post("/auth/register", userFields);
};

export const login = async (userFields) => {
  return api.post("/auth/login", userFields);
};
