import { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";

const useMarkers = (styleLoaded) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (styleLoaded) {
      const fetchMarkers = async () => {
        try {
          const response = await axiosInstance.get("/points-of-interest");
          const formattedMarkers = response.data.map((marker) => ({
            ...marker,
            coordinate: JSON.parse(marker.coordinate),
            details: marker.details ? JSON.parse(marker.details) : {}, // Parse details if available
          }));
          console.log("Markers fetched:", formattedMarkers); // Ajout du console.log
          setMarkers(formattedMarkers);
        } catch (error) {
          console.error("Error loading markers:", error);
        }
      };

      fetchMarkers();
    }
  }, [styleLoaded]);

  return [markers, setMarkers];
};

export default useMarkers;
