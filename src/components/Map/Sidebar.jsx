import React, { useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar, markerInfo }) => {
  useEffect(() => {
    console.log("Selected marker info:", markerInfo); // Ajout du console.log
  }, [markerInfo]);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "<" : ">"}
      </button>
      {markerInfo && (
        <div className="marker-info">
          <h2>{markerInfo.name_point}</h2>
          <p>Longitude: {markerInfo.coordinate.longitude}</p>
          <p>Latitude: {markerInfo.coordinate.latitude}</p>
          {markerInfo.details && (
            <>
              {markerInfo.details.openingHours && (
                <p>Opening Hours: {markerInfo.details.openingHours}</p>
              )}
              {markerInfo.details.description && (
                <p>Description: {markerInfo.details.description}</p>
              )}
              {markerInfo.details.website && (
                <p>
                  Website:{" "}
                  <a
                    href={markerInfo.details.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {markerInfo.details.website}
                  </a>
                </p>
              )}
              {markerInfo.details.phoneNumber && (
                <p>Phone Number: {markerInfo.details.phoneNumber}</p>
              )}
              {markerInfo.details.email && (
                <p>
                  Email:{" "}
                  <a href={`mailto:${markerInfo.details.email}`}>
                    {markerInfo.details.email}
                  </a>
                </p>
              )}
              {markerInfo.details.accessibility && (
                <p>Accessibility: {markerInfo.details.accessibility}</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
