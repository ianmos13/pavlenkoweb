"use client";

import "swiper/css";
import React, { useState, useEffect } from "react";
import styles from "./SliderWithPopup.module.scss";
import SectionWithSlider from "@/components/UI/SectionWithSlider/SectionWithSlider";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
import CustomCoverflowSlider from "@/components/UI/CustomCoverflowSlider/CustomCoverflowSlider";

export default function SliderWithPopup() {
  const { data: feedbackData, loading, error } = useFetch(
    "/feedback-datas?sort=rank:asc&pagination[pageSize]=9999999"
  );

  const formattedData = feedbackData.map((item) => ({
    text: item.text
      .map((paragraph) =>
        paragraph.children.map((child) => child.text).join("")
      )
      .join("\n"),
    date: item.date,
    city: item.city,
  }));

  const titleOptions = {
    title: "Что говорят пациенты",
    containerStyles: { backgroundColor: "#f2f5fa" },
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [feedbackParams, setFeedbackParams] = useState({});

  const togglePopup = (feedback) => {
    setFeedbackParams(feedback);
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    if (isPopupOpen) {
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
  }, [isPopupOpen]);

  return (
    <Loader loading={loading}>
      <AnimatedComponent>
        <div className={styles.container}>
          <SectionWithSlider titleOptions={titleOptions}>
            <>
              <div className={styles.desktopSwiper}>
                {formattedData && (
                  <CustomCoverflowSlider
                    data={formattedData}
                    type={"feedbackSlide"}
                    togglePopup={togglePopup}
                  />
                )}
              </div>
              {isPopupOpen && (
                <InfoPopup data={feedbackParams} togglePopup={togglePopup} />
              )}
            </>
          </SectionWithSlider>
        </div>
      </AnimatedComponent>
    </Loader>
  );
}

const InfoPopup = ({ data, togglePopup }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={togglePopup}>
            <img
              src="/images/icons/close-icon-dark.svg"
              alt="Close icon dark"
            />
          </button>
        </div>
        <div className={styles.modalData}>
          <p className={styles.dateContainer}>{data.date}</p>
          <div className={styles.textContainer}>
            <p>{data.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
