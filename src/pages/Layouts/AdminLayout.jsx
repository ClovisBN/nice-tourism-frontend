// src/layouts/AdminLayout.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";

const AdminLayout = () => {
  const { user } = useAppContext();

  // Vérification du rôle admin
  if (!user || user.role_id !== 1) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <NavbarAdmin />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
