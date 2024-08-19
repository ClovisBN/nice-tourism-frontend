// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axiosInstance from "../axiosConfig";
import { jwtDecode } from "jwt-decode"; // Assurez-vous d'avoir installé cette bibliothèque

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.get("/sanctum/csrf-cookie");

      const response = await axiosInstance.post("/login", { email, password });

      if (response && response.data) {
        const { access_token, jwt_token } = response.data;

        const decodedToken = jwtDecode(jwt_token);

        const user = {
          role_id: decodedToken.role_id,
          ...decodedToken,
        };

        localStorage.setItem("access_token", access_token);
        setUser(user); // Mettre à jour le contexte avec les infos utilisateur

        if (user.role_id === 1) {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
