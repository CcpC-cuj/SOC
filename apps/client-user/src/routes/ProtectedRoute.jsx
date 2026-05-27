import { Navigate } from "react-router-dom";

import {
  getStoredUser,
  getUserToken,
} from "../services/authStorage";

const ProtectedRoute = ({
  children,
}) => {
  const token = getUserToken();
  const user = getStoredUser();

  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
