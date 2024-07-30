// src/components/FormComponents/EmailComponent.jsx
import React from "react";

const EmailComponent = ({ email, setEmail }) => {
  return (
    <div>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};

export default EmailComponent;
