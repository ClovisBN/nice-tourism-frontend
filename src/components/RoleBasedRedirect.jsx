// src/components/RoleBasedRedirect.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const RoleBasedRedirect = () => {
  const { user } = useAppContext();

  if (user) {
    if (user.role_id === 1) {
      // Redirection pour les admins
      return <Navigate to="/admin/users" replace />;
    } else {
      // Redirection pour les utilisateurs
      return <Navigate to="/user" replace />;
    }
  } else {
    console.log(user);

    // Redirection pour les visiteurs non connectés
    return <Navigate to="/" replace />;
  }
};

export default RoleBasedRedirect;
