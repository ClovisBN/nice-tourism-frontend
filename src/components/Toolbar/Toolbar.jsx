// src/components/Toolbar/Toolbar.jsx
import React from "react";
import "./Toolbar.css";
import { useAppContext } from "../../context/AppContext";

const Toolbar = () => {
  const { isAddingMarker, setIsAddingMarker } = useAppContext();

  const toggleAddMarker = () => {
    setIsAddingMarker(!isAddingMarker);
  };

  return (
    <div className="toolbar">
      <button
        onClick={toggleAddMarker}
        className={isAddingMarker ? "active" : ""}
      >
        {isAddingMarker ? "Disable Add Marker" : "Enable Add Marker"}
      </button>
    </div>
  );
};

export default Toolbar;
