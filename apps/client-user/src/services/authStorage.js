export const getUserToken = () =>
  localStorage.getItem("user_token");

export const getAdminToken = () =>
  localStorage.getItem("admin_token");

export const getAnyToken = () =>
  getAdminToken() || getUserToken();

export const getStoredUser = () => {
  const user =
    localStorage.getItem("user");

  return user
    ? JSON.parse(user)
    : null;
};

export const getStoredAdmin = () => {
  const admin =
    localStorage.getItem(
      "admin_user"
    );

  return admin
    ? JSON.parse(admin)
    : null;
};

export const setUserSession = (
  token,
  user
) => {
  localStorage.setItem(
    "user_token",
    token
  );
  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );
};

export const setAdminSession = (
  token,
  user
) => {
  localStorage.setItem(
    "admin_token",
    token
  );
  localStorage.setItem(
    "admin_user",
    JSON.stringify(user)
  );
};

export const clearUserSession = () => {
  localStorage.removeItem(
    "user_token"
  );
  localStorage.removeItem("user");
};

export const clearAdminSession =
  () => {
    localStorage.removeItem(
      "admin_token"
    );
    localStorage.removeItem(
      "admin_user"
    );
  };

export const clearAllSessions = () => {
  clearUserSession();
  clearAdminSession();
};
