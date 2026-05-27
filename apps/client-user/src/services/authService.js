import API from "./api";
import {
  clearAdminSession,
  clearAllSessions,
  clearUserSession,
  getAdminToken,
  getStoredAdmin,
  getStoredUser,
  getUserToken,
  setAdminSession,
  setUserSession,
} from "./authStorage";

export const registerUser = async (
  userData
) => {
  const response =
    await API.post(
      "/auth/register",
      userData
    );

  setUserSession(
    response.data.token,
    response.data.user
  );

  return response.data;
};

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

  clearAllSessions();

  if (user.authority === "admin") {
    setAdminSession(
      response.data.token,
      user
    );
  } else {
    setUserSession(
      response.data.token,
      user
    );
  }

  return response.data;
};

export const requestPasswordReset =
  async (email) => {
    const response =
      await API.post(
        "/auth/forgot-password",
        { email }
      );

    return response.data;
  };

export const resetPassword = async ({
  token,
  password,
}) => {
  const response =
    await API.post(
      "/auth/reset-password",
      {
        token,
        password,
      }
    );

  return response.data;
};

export const resendVerificationEmail =
  async (email) => {
    const response =
      await API.post(
        "/auth/resend-verification",
        { email }
      );

    return response.data;
  };

export const verifyEmailToken =
  async (token) => {
    const response =
      await API.post(
        "/auth/verify-email",
        { token }
      );

    return response.data;
  };

export const logoutUser = () => {
  clearUserSession();
  window.location.href = "/login";
};

export const logoutAdmin = () => {
  clearAdminSession();
  window.location.href = "/login";
};

export {
  clearAllSessions as clearAuth,
  clearAdminSession as clearAdminAuth,
  getUserToken,
  getAdminToken,
  getStoredUser as getUser,
  getStoredAdmin as getAdmin,
};
