import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase"; // Import from firebase.js

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser;

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  return children; // Render the protected component if authenticated
};

export default PrivateRoute;
