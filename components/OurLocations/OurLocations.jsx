"use client";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import styles from "./OurLocations.module.scss";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";
import declineWord from "decline-word";

const LocationMap = dynamic(() => import("./LocationMap/LocationMap"), { ssr: false });

const OurLocations = () => {
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [activeCity, setActiveCity] = useState(null);
  const [mapCenter, setMapCenter] = useState([55.7558, 37.6173]);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 739);
    };
    
    handleResize(); // Проверяем при первоначальной загрузке
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const {
    data: citiesData,
    loading: citiesLoading,
    error: citiesError,
  } = useFetch("/our-locations-cities?pagination[pageSize]=9999999");

  const {
    data: clinicsData,
    loading: clinicsLoading,
    error: clinicsError,
  } = useFetch("/our-locations-clinics?populate=*&pagination[pageSize]=9999999");

  const loading = citiesLoading || clinicsLoading;
  const error = citiesError || clinicsError;

  const clinicDetails = React.useMemo(() => {
    if (!citiesData || !clinicsData) return [];
    return citiesData.map((city) => ({
      city: city.city,
      clinics: clinicsData
        .filter((clinic) => clinic.city.id === city.id)
        .map((clinic) => ({
          name: clinic.name,
          lat: clinic.lat,
          lng: clinic.lng,
          details: {
            address: clinic.address,
            description: clinic.description,
            mentors: clinic.mentors,
            stats: clinic.stats,
          },
        })),
    }));
  }, [citiesData, clinicsData]);

  const handleClinicClick = (clinic) => {
    closeModal();
    setMapCenter([clinic.lat, clinic.lng]);
    setZoomLevel(16);
  };

  const handleMarkerClick = (clinic) => {
    setSelectedClinic(clinic);
    setMapCenter([clinic.lat, clinic.lng]);
    setZoomLevel(16);
  };

  const closeModal = () => {
    setSelectedClinic(null);
    setMapCenter([55.7558, 37.6173]);
    setZoomLevel(10);
  };

  // Блокировка прокрутки фона при открытом модальном окне
  useEffect(() => {
    if (selectedClinic) {
      document.body.classList.add("modal-open");
      document.documentElement.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    };
  }, [selectedClinic]);

  return (
    <div className={styles.container}>
      <h2>Наши базы</h2>
      <Loader loading={loading}>
        <div className={styles.ourLocations}>
          <div className={styles.locationList}>
            {clinicDetails.map((location, idx) => (
              <div key={idx} className={styles.city}>
                <div
                  className={`${styles.cityHeader} ${
                    activeCity === idx ? styles.activeCity : ""
                  }`}
                  onClick={() => setActiveCity(activeCity === idx ? null : idx)}>
                  <h4>
                    {location.city} ({location.clinics.length} {declineWord(location.clinics.length, 'клиник', 'а', 'и', '')})
                  </h4>
                  <img
                    src={
                      activeCity === idx
                        ? "/images/icons/arrow-up-dark.svg"
                        : "/images/icons/arrow-down-dark.svg"
                    }
                    alt="toggle arrow"
                    className={styles.toggleIcon}
                  />
                </div>
                {activeCity === idx && (
                  <div className={styles.clinicList}>
                    {location.clinics.map((clinic, index) => (
                      <div
                        key={index}
                        className={styles.clinic}
                        onClick={() => handleClinicClick(clinic)}>
                        <span className={styles.icon}>
                          <img
                            src="/images/icons/heart-filled-light-blue-2.svg"
                            alt="clinic icon"
                          />
                        </span>
                        <h5>{clinic.name}</h5>
                      </div>
                    ))}
                    {isMobile && (
                      <div className={styles.mapVisual}>
                        <LocationMap
                          mapCenter={mapCenter}
                          zoomLevel={zoomLevel}
                          locationsData={clinicDetails}
                          onMarkerClick={handleMarkerClick}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!isMobile && (
            <LocationMap
              mapCenter={mapCenter}
              zoomLevel={zoomLevel}
              locationsData={clinicDetails}
              onMarkerClick={handleMarkerClick}
            />
          )}

          {selectedClinic && (
            <div className={styles.modalOverlay} onClick={closeModal}>
              <div
                className={`${styles.modalContent} ${
                  isMobile ? styles.mobileModal : ""
                }`}
                onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                  <h4 className={styles.modalTitle}>{selectedClinic.name}</h4>
                  <p>{selectedClinic.details.description}</p>
                  <button className={styles.closeButton} onClick={closeModal}>
                    <img
                      src="/images/icons/close-icon-dark.svg"
                      alt="Close icon dark"
                    />
                  </button>
                </div>
                <div className={styles.modalData}>
                  <div className={styles.modalSection}>
                    <h4 className={styles.sectionTitle}>
                      <img
                        src="/images/icons/adress-icon.svg"
                        alt="address icon"
                      />{" "}
                      Адрес
                    </h4>
                    <p className={styles.sectionText}>
                      {selectedClinic.details.address}
                    </p>
                  </div>
                  <div className={styles.modalSection}>
                    <h4 className={styles.sectionTitle}>
                      <img
                        src="/images/icons/mentors-icon.png"
                        alt="mentors icon"
                      />{" "}
                      Наставники
                    </h4>
                    {selectedClinic.details.mentors.map((mentor, index) => (
                      <div key={index} className={styles.sectionPerson}>
                        <p className={styles.sectionTextName}>{mentor.name}</p>
                        <p className={styles.sectionText}>{mentor.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className={styles.modalSection}>
                    <h4 className={styles.sectionTitle}>
                      <img src="/images/icons/stats-icon.png" alt="stats icon" />{" "}
                      Немного в цифрах
                    </h4>
                    <p className={styles.sectionText}>
                      {selectedClinic.details.stats}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Loader>
    </div>
  );
};

export default OurLocations;