// src/components/FormComponents/DescriptionComponent.jsx
import React from "react";

const DescriptionComponent = ({ description, setDescription }) => {
  return (
    <div>
      <label>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};

export default DescriptionComponent;
