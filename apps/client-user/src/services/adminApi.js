import axios from "axios";

import {
  clearAdminAuth,
} from "./authService";

const AdminAPI =
  axios.create({

    baseURL:
      import.meta.env
        .VITE_API_URL,

    withCredentials: true,
  });


// REQUEST INTERCEPTOR
AdminAPI.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "admin_token"
      );

    // ATTACH TOKEN
    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(
      error
    );
  }
);


// RESPONSE INTERCEPTOR
AdminAPI.interceptors.response.use(

  (response) => response,

  async (error) => {

    // UNAUTHORIZED
    if (
      error.response &&
      error.response.status === 401
    ) {

      console.error(
        "Admin unauthorized"
      );

      clearAdminAuth();
    }

    // SERVER OFFLINE
    if (
      error.code === "ERR_NETWORK"
    ) {

      console.error(
        "Server unreachable"
      );
    }

    return Promise.reject(
      error
    );
  }
);

export default AdminAPI;