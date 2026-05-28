import React from "react";

import {
  Navigate,
  Outlet,
} from "react-router-dom";

const AdminProtectedRoute =
  () => {

    // GET TOKEN
    const token =
      localStorage.getItem(
        "token"
      );

    // GET ADMIN STATUS
    const isAdmin =
      localStorage.getItem(
        "isAdmin"
      );

    return token &&
      isAdmin === "true" ? (

      <Outlet />

    ) : (

      <Navigate to="/login" />

    );

  };

export default AdminProtectedRoute;