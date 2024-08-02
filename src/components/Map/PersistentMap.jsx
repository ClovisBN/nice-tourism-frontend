import React, { useEffect, useRef, useState } from "react";
import Map, { Source, Layer, Marker } from "react-map-gl";
import MapControls from "./MapControls";
import { useAppContext } from "../../context/AppContext";
import axiosInstance from "../../axiosConfig";
import MarkerPopup from "./MarkerPopup";
import Sidebar from "./Sidebar";
import useMarkers from "../../hooks/useMarkers";
import "./PersistentMap.css";
import Toolbar from "../Toolbar/Toolbar";

const PersistentMap = () => {
  const mapRef = useRef(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const {
    mapState,
    setMapState,
    isMapVisible,
    isAddingMarker,
    setIsAddingMarker,
  } = useAppContext();
  const [styleLoaded, setStyleLoaded] = useState(false);
  const [newMarker, setNewMarker] = useState(null);
  const [markers, setMarkers] = useMarkers(styleLoaded);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [clickOnMarker, setClickOnMarker] = useState(false);

  const HERBIGNAC_BOUNDS = [
    [-2.4, 47.4],
    [-2.2, 47.5],
  ];

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

  const handleMapLoad = () => {
    setStyleLoaded(true);
  };

  const handleMove = (event) => {
    const { longitude, latitude, zoom } = event.viewState;
    setMapState({ longitude, latitude, zoom });
  };

  const handleMapClick = (event) => {
    if (isAddingMarker) {
      const [longitude, latitude] = [event.lngLat.lng, event.lngLat.lat];
      setNewMarker({ longitude, latitude });
      setIsAddingMarker(false);
    } else if (sidebarOpen && !clickOnMarker) {
      setSidebarOpen(false);
    }
    setClickOnMarker(false);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setSidebarOpen(true);
    setClickOnMarker(true);
    mapRef.current.flyTo({
      center: [marker.coordinate.longitude, marker.coordinate.latitude],
      zoom: 15,
      bearing: 30,
      pitch: 45,
      essential: true,
    });
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
      id="dssd"
      style={{
        height: "100vh",
        width: "100%",
        position: isMapVisible ? "relative" : "absolute",
        visibility: isMapVisible ? "visible" : "hidden",
        cursor: isAddingMarker ? "crosshair" : "auto",
        overflow: "hidden",
      }}
    >
      <Toolbar />

      <Map
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1IjoibmF6YXJoaWhpaGloaWhpaGkiLCJhIjoiY2x6MmVmYWhhMzc0ZzJqcXZ0cWE0NjBrdiJ9.Lr_HpvdNlqvstGpiM_lH0w"
        initialViewState={mapState}
        onMove={handleMove}
        onLoad={handleMapLoad}
        onClick={handleMapClick}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/nazarhihihihihihi/clz342blm00np01ph9luqcrld"
        maxBounds={HERBIGNAC_BOUNDS}
        minZoom={8}
        maxZoom={18}
      >
        <MapControls />
        {styleLoaded && geoJsonData && (
          <Source id="herbignac" type="geojson" data={geoJsonData}>
            <Layer
              id="herbignac-fill"
              type="fill"
              paint={{
                "fill-color": "#888888",
                "fill-opacity": 0,
              }}
            />
            <Layer
              id="herbignac-outline"
              type="line"
              paint={{
                "line-color": "#000000",
                "line-width": 2,
              }}
            />
          </Source>
        )}
        {styleLoaded &&
          markers.map((marker) => (
            <Marker
              key={marker.id}
              longitude={marker.coordinate.longitude}
              latitude={marker.coordinate.latitude}
              onClick={() => handleMarkerClick(marker)}
            >
              <img
                src="/sprite_images/mapbox-circle.svg"
                alt="Marker"
                className="marker-icon"
              />
            </Marker>
          ))}
      </Map>
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
    </div>
  );
};

export default PersistentMap;
