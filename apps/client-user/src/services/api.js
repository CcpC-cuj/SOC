import axios from "axios";

import {
  clearAllSessions,
  getUserToken,
} from "./authStorage";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = getUserToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) =>
    Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401
    ) {
      clearAllSessions();
    }

    return Promise.reject(error);
  }
);

export default API;
