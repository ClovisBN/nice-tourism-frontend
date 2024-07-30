// src/components/FormComponents/WebsiteComponent.jsx
import React from "react";

const WebsiteComponent = ({ website, setWebsite }) => {
  return (
    <div>
      <label>Site web:</label>
      <input
        type="url"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
    </div>
  );
};

export default WebsiteComponent;
