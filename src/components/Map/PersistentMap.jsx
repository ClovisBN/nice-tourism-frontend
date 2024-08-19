import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAppContext } from "../../context/AppContext";
import axiosInstance from "../../axiosConfig";
import MarkerPopup from "./MarkerPopup";
import Sidebar from "./Sidebar";
import useMarkers from "../../hooks/useMarkers";
import "./PersistentMap.css";
import Toolbar from "../Toolbar/Toolbar";

const HERBIGNAC_BOUNDS = [
  [47.4, -2.4], // Sud-Ouest d'Herbignac
  [47.5, -2.2], // Nord-Est d'Herbignac
];

const PersistentMap = () => {
  const { isMapVisible, isAddingMarker, setIsAddingMarker } = useAppContext();
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [newMarker, setNewMarker] = useState(null);
  const [markers, setMarkers] = useMarkers(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    fetchGeoJsonData();
  }, []);

  const fetchGeoJsonData = async () => {
    try {
      const response = await fetch("/herbignac-contour.json");
      const data = await response.json();
      setGeoJsonData(data);
    } catch (error) {
      console.error("Error loading GeoJSON:", error);
    }
  };

  const handleMapClick = (event) => {
    console.log("Map was clicked!"); // Test pour voir si la fonction est bien appelée
    const { lat, lng } = event.latlng;
    console.log(`Clicked at longitude: ${lng}, latitude: ${lat}`);

    if (isAddingMarker) {
      setNewMarker({ longitude: lng, latitude: lat });
      setIsAddingMarker(false);
    } else if (sidebarOpen && !selectedMarker) {
      setSidebarOpen(false);
    }
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setSidebarOpen(true);
  };

  const handleMarkerSubmit = async (details) => {
    try {
      const formData = new FormData();
      formData.append("name_point", details.name);
      formData.append(
        "coordinate",
        JSON.stringify({
          longitude: details.longitude,
          latitude: details.latitude,
        })
      );
      formData.append(
        "details",
        JSON.stringify({
          openingHours: details.openingHours || "",
          description: details.description || "",
          website: details.website || "",
          phoneNumber: details.phoneNumber || "",
          email: details.email || "",
          accessibility: details.accessibility || "",
        })
      );
      if (details.image) {
        formData.append("image", details.image);
      }

      console.log("Payload being sent:", formData);

      const response = await axiosInstance.post(
        "/points-of-interest",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMarkers((prevMarkers) => [
        ...prevMarkers,
        {
          ...response.data,
          coordinate: {
            longitude: details.longitude,
            latitude: details.latitude,
          },
        },
      ]);
      setNewMarker(null);
    } catch (error) {
      console.error("Error saving marker:", error);
    }
  };

  return (
    <div
      id="map-container"
      style={{
        height: "100vh",
        width: "100%",
        zIndex: "1",
        position: isMapVisible ? "relative" : "absolute",
        visibility: isMapVisible ? "visible" : "hidden",
        cursor: isAddingMarker ? "crosshair" : "auto",
        overflow: "hidden",
      }}
      onClick={() => console.log("Div was clicked!")}
    >
      <MapContainer
        center={[47.45, -2.3]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: "1000" }}
        minZoom={12}
        maxBounds={HERBIGNAC_BOUNDS}
        maxBoundsViscosity={1.0}
        onClick={handleMapClick}
        onMouseMove={() => console.log("Mouse is moving over the map")}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoJsonData && (
          <GeoJSON data={geoJsonData} style={{ color: "#000000", weight: 2 }} />
        )}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.coordinate.latitude, marker.coordinate.longitude]}
            eventHandlers={{
              click: () => handleMarkerClick(marker),
            }}
          >
            <Popup>{marker.name_point}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {newMarker && (
        <MarkerPopup
          longitude={newMarker.longitude}
          latitude={newMarker.latitude}
          handleMarkerSubmit={handleMarkerSubmit}
        />
      )}
      {selectedMarker && (
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          markerInfo={selectedMarker}
        />
      )}
      <Toolbar />
    </div>
  );
};

export default PersistentMap;
