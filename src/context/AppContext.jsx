// src/context/AppContext.js
import React, { createContext, useContext, useState } from "react";

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
