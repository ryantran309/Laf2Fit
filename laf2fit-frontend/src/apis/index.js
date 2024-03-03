import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export default api;

api.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      config.headers["Authorization"] = window.localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
