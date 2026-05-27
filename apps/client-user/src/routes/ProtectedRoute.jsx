import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  getStoredUser,
  getUserToken,
} from "../services/authStorage";

const ProtectedRoute = ({
  children,
}) => {
  const location =
    useLocation();
  const token = getUserToken();
  const user = getStoredUser();

  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from:
            location.pathname,
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
