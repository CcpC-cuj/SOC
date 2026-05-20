// // services/authService.js
// import API from "./api";

// // REGISTER
// export const registerUser = async (
//   userData
// ) => {

//   const response =
//     await API.post(
//       "/auth/register",
//       userData
//     );

//   return response.data;
// };

// // LOGIN
// export const loginUser = async (
//   userData
// ) => {

//   const response =
//     await API.post(
//       "/auth/login",
//       userData
//     );

//   return response.data;
// };



// services/authService.js

import API from "./api";


// REGISTER USER
export const registerUser = async (
  userData
) => {

  const response =
    await API.post(
      "/auth/register",
      userData
    );

  // SAVE USER TOKEN
  localStorage.setItem(
    "user_token",
    response.data.token
  );

  // SAVE USER DATA
  localStorage.setItem(
    "user",
    JSON.stringify(
      response.data.user
    )
  );

  return response.data;
};


// LOGIN
export const loginUser = async (
  userData
) => {

  const response =
    await API.post(
      "/auth/login",
      userData
    );

  const user =
    response.data.user;

  // ADMIN LOGIN
  if (
    user.authority === "admin"
  ) {

    localStorage.setItem(
      "admin_token",
      response.data.token
    );

    localStorage.setItem(
      "admin_user",
      JSON.stringify(user)
    );

  } else {

    // USER LOGIN
    localStorage.setItem(
      "user_token",
      response.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  }

  return response.data;
};




// USER LOGOUT
export const logoutUser = () => {

  localStorage.removeItem(
    "user_token"
  );

  localStorage.removeItem(
    "user"
  );

  window.location.href =
    "/login";
};


// ADMIN LOGOUT
export const logoutAdmin = () => {

  localStorage.removeItem(
    "admin_token"
  );

  localStorage.removeItem(
    "admin_user"
  );

  window.location.href =
    "/login";
};


// GET USER TOKEN
export const getUserToken =
  () => {

    return localStorage.getItem(
      "user_token"
    );
};


// GET ADMIN TOKEN
export const getAdminToken = () => {

  return localStorage.getItem(
    "admin_token"
  );
};


// GET USER
export const getUser = () => {

  const user =
    localStorage.getItem(
      "user"
    );

  return user
    ? JSON.parse(user)
    : null;
};


// GET ADMIN
export const getAdmin = () => {

  const admin =
    localStorage.getItem(
      "admin_user"
    );

  return admin
    ? JSON.parse(admin)
    : null;
};


// CLEAR ALL AUTH
export const clearAuth = () => {

  localStorage.removeItem(
    "user_token"
  );

  localStorage.removeItem(
    "user"
  );

  localStorage.removeItem(
    "admin_token"
  );

  localStorage.removeItem(
    "admin_user"
  );

  window.location.href =
    "/login";
};


export const clearAdminAuth =
  () => {

    localStorage.removeItem(
      "admin_token"
    );

    localStorage.removeItem(
      "admin_user"
    );

    window.location.href =
      "/login";
};
