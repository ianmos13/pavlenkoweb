"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import styles from "./LocationMap.module.scss";

const createCustomMarkerIcon = () =>
  L.icon({
    iconUrl: "/images/icons/map-marker.svg",
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
  });

const createCustomClusterIcon = (cluster) => {
  const count = cluster.getChildCount();
  return L.divIcon({
    html: `<div class="custom-cluster-icon"><img src="/images/icons/map-marker-count.svg" alt="Cluster icon"/><span>${count}</span></div>`,
    className: "custom-cluster",
    iconSize: [50, 50],
  });
};

const MapCenter = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
};

const LocationMap = ({
  mapCenter,
  zoomLevel,
  locationsData,
  onMarkerClick,
  extraClass,
}) => {
  const [selectedClinic, setSelectedClinic] = useState(null);

  useEffect(() => {
    setSelectedClinic(null);
  }, [mapCenter, zoomLevel]);

  const handleMarkerClick = (clinic) => {
    setSelectedClinic({
      lat: clinic.lat,
      lng: clinic.lng,
    });
    onMarkerClick(clinic);
  };

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoomLevel}
      className={`${styles.map} ${styles[`${extraClass}Container`]}`}>
      <MapCenter center={mapCenter} zoom={zoomLevel} />

      {selectedClinic && (
        <MapCenter
          center={[selectedClinic.lat, selectedClinic.lng]}
          zoom={16}
        />
      )}

      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap contributors &copy; CARTO"
      />

      <MarkerClusterGroup
        iconCreateFunction={createCustomClusterIcon}
        disableClusteringAtZoom={15}>
        {locationsData.flatMap((location) =>
          location.clinics.map((clinic) => (
            <Marker
              key={clinic.name}
              position={[clinic.lat, clinic.lng]}
              icon={createCustomMarkerIcon()}
              eventHandlers={{
                click: () => handleMarkerClick(clinic),
              }}
            />
          ))
        )}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default LocationMap;
