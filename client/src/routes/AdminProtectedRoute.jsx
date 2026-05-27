import React from "react";

import {
  Navigate,
  Outlet,
} from "react-router-dom";

const AdminProtectedRoute = () => {

  const adminInfo =
    JSON.parse(
      localStorage.getItem(
        "adminInfo"
      )
    );

  return adminInfo?.isAdmin
    ? <Outlet />
    : <Navigate to="/login" />;
};

export default AdminProtectedRoute;