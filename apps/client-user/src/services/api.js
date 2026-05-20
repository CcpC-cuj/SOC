// import axios from "axios";

// const API = axios.create({
//   baseURL:
//     "http://localhost:5000/api",
// });

// export default API;

// import axios
// from "axios";

// const API =
//   axios.create({
//     baseURL:
//       "http://localhost:5000/api",
//   });

// // REQUEST INTERCEPTOR
// API.interceptors.request.use(
//   (config) => {

//     const token =
//       localStorage.getItem(
//         "token"
//       );

//     if (token) {

//       config.headers.Authorization =
//         `Bearer ${token}`;
//     }

//     return config;
//   }
// );

// // RESPONSE INTERCEPTOR
// API.interceptors.response.use(

//   (response) =>
//     response,

//   (error) => {

//     // TOKEN INVALID
//     if (
//       error.response
//       &&
//       error.response.status
//       === 401
//     ) {

//       localStorage.removeItem(
//         "token"
//       );

//       localStorage.removeItem(
//         "user"
//       );

//       window.location.href =
//         "/";
//     }

//     // SERVER OFFLINE
//     if (
//       error.code
//       === "ERR_NETWORK"
//     ) {

//       localStorage.removeItem(
//         "token"
//       );

//       localStorage.removeItem(
//         "user"
//       );

//       window.location.href =
//         "/";
//     }

//     return Promise.reject(
//       error
//     );
//   }
// );

// export default API;


// services/api.js

import axios from "axios";

import {
  clearAuth,
} from "./authService";

const API = axios.create({

  baseURL:
    import.meta.env.VITE_API_URL,

  withCredentials: true,
});


// REQUEST INTERCEPTOR
API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "user_token"
      );

    // ATTACH TOKEN
    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);


// RESPONSE INTERCEPTOR
API.interceptors.response.use(

  (response) => response,

  async (error) => {

    // UNAUTHORIZED
    if (
      error.response &&
      error.response.status === 401
    ) {

      console.error(
        "Unauthorized request"
      );

      clearAuth();
    }

    // SERVER OFFLINE
    if (
      error.code === "ERR_NETWORK"
    ) {

      console.error(
        "Server unreachable"
      );
    }

    return Promise.reject(error);
  }
);

export default API;