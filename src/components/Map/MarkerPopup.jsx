// src/components/Map/MarkerPopup.jsx
import React from "react";
import "./MarkerPopup.css";
import MainForm from "../FormComponents/MainForm";

const MarkerPopup = ({ longitude, latitude, handleMarkerSubmit }) => {
  return (
    <div className="marker-popup">
      <h3>Ajouter un marqueur</h3>
      <p>Longitude: {longitude}</p>
      <p>Latitude: {latitude}</p>
      <MainForm
        handleSubmit={handleMarkerSubmit}
        longitude={longitude}
        latitude={latitude}
      />
    </div>
  );
};

export default MarkerPopup;
