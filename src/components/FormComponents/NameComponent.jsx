// src/components/FormComponents/NameComponent.jsx
import React from "react";

const NameComponent = ({ name, setName }) => {
  return (
    <div>
      <label>Nom:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </div>
  );
};

export default NameComponent;
