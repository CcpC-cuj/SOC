import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  getAdminToken,
  getStoredAdmin,
} from "../services/authStorage";

const AdminRoute = ({
  children,
}) => {
  const location =
    useLocation();
  const token = getAdminToken();
  const user = getStoredAdmin();

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

  if (user.authority !== "admin") {
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
