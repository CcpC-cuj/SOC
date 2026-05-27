import axios from "axios";

import {
  clearAdminSession,
  getAdminToken,
} from "./authStorage";

const AdminAPI = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL,
  withCredentials: true,
});

AdminAPI.interceptors.request.use(
  (config) => {
    const token = getAdminToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) =>
    Promise.reject(error)
);

AdminAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401
    ) {
      clearAdminSession();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default AdminAPI;
