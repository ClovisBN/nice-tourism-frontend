// src/components/FormComponents/AccessibilityComponent.jsx
import React from "react";

const AccessibilityComponent = ({ accessibility, setAccessibility }) => {
  return (
    <div>
      <label>Accessibilité:</label>
      <input
        type="text"
        value={accessibility}
        onChange={(e) => setAccessibility(e.target.value)}
      />
    </div>
  );
};

export default AccessibilityComponent;
