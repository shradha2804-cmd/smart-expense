import React from "react";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  // GET TOKEN ONLY
  const token =
    localStorage.getItem("token");

  // IF NO TOKEN
  if (!token) {

    return (
      <Navigate to="/login" />
    );

  }

  return children;
};

export default ProtectedRoute;