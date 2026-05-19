// src/routes/AdminRoute.jsx

import {
  Navigate,
} from "react-router-dom";

const AdminRoute = ({
  children,
}) => {

  const token =
    localStorage.getItem(
      "admin_token"
    );

  const userData =
    localStorage.getItem(
      "admin_user"
    );

  const user =
    userData
      ? JSON.parse(userData)
      : null;

  // NOT LOGGED IN
  if (!token || !user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // NOT ADMIN
  if (
    user.authority
    !== "admin"
  ) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
};

export default AdminRoute;