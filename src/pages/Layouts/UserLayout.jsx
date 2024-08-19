// src/layouts/UserLayout.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import NavbarUser from "../../components/Navbar/NavbarUser";

const UserLayout = () => {
  const { user } = useAppContext();

  // Si l'utilisateur est admin (role_id === 1), redirige vers la page d'accueil admin
  if (user && user.role_id === 1) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div>
      <NavbarUser />
      <Outlet />
    </div>
  );
};

export default UserLayout;
