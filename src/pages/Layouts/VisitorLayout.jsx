// src/layouts/VisitorLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavbarVisitor from "../../components/Navbar/NavbarVisitor"; // Créez un Navbar spécifique pour les visiteurs

const VisitorLayout = () => {
  return (
    <div>
      <NavbarVisitor />
      <Outlet />
    </div>
  );
};

export default VisitorLayout;
