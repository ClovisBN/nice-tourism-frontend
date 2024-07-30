// src/components/FormComponents/PhoneNumberComponent.jsx
import React from "react";

const PhoneNumberComponent = ({ phoneNumber, setPhoneNumber }) => {
  return (
    <div>
      <label>Numéro de téléphone:</label>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </div>
  );
};

export default PhoneNumberComponent;
