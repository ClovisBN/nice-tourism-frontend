// src/context/AppContext.js
import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../axiosConfig";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [mapState, setMapState] = useState({
    longitude: -2.31667,
    latitude: 47.450001,
    zoom: 12,
  });
  const [isMapVisible, setIsMapVisible] = useState(true);
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      await axiosInstance.get("/sanctum/csrf-cookie");

      const response = await axiosInstance.post("/login", credentials);

      setUser(response.data.user);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    delete axiosInstance.defaults.headers.common["Authorization"];
  };

  const refreshToken = async () => {
    try {
      const response = await axiosInstance.post("/auth/refresh-token", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
        },
      });
      localStorage.setItem("access_token", response.data.access_token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
    } catch (error) {
      console.error("Refresh token error:", error);
      logout();
    }
  };

  return (
    <AppContext.Provider
      value={{
        mapState,
        setMapState,
        isMapVisible,
        setIsMapVisible,
        isAddingMarker,
        setIsAddingMarker,
        user,
        setUser,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
