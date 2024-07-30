// src/components/FormComponents/OpeningHoursComponent.jsx
import React from "react";

const OpeningHoursComponent = ({ openingHours, setOpeningHours }) => {
  return (
    <div>
      <label>Horaires d'ouverture:</label>
      <input
        type="text"
        value={openingHours}
        onChange={(e) => setOpeningHours(e.target.value)}
      />
    </div>
  );
};

export default OpeningHoursComponent;
