"use client";

import "swiper/css";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import styles from "./SliderWithPopup.module.scss";
import SectionWithSlider from "@/components/UI/SectionWithSlider/SectionWithSlider";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";
export default function SliderWithPopup() {
  const { data: feedbackData, loading, error } = useFetch("/feedback-datas?sort=rank:asc");

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

  return (
    <Loader loading={loading}>
      <div className={styles.container}>
        <SectionWithSlider titleOptions={titleOptions}>
          <>
            <Swiper
              className={styles.swiperContainer}
              effect={"coverflow"}
              centeredSlides={true}
              loop={true}
              slidesPerView={"auto"}
              modules={[EffectCoverflow]}
              coverflowEffect={{
                rotate: 0,
                stretch: -70,
                depth: 200,
                modifier: 2,
                slideShadows: false,
              }}
              breakpoints={{
                320: {
                  coverflowEffect: { stretch: -35 },
                },
                740: {
                  coverflowEffect: { stretch: -50 },
                },
                1025: {
                  coverflowEffect: { stretch: -70 },
                },
              }}>
              {formattedData &&
                formattedData?.map((feedback, idx) => (
                  <SwiperSlide key={idx} className={styles.swiperSlide}>
                    <FeedbackSlide data={feedback} togglePopup={togglePopup} />
                  </SwiperSlide>
                ))}
            </Swiper>
            {isPopupOpen && (
              <InfoPopup data={feedbackParams} togglePopup={togglePopup} />
            )}
          </>
        </SectionWithSlider>
      </div>
    </Loader>
  );
}

const FeedbackSlide = ({ data, togglePopup }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      const isOverflow = element.scrollHeight > element.clientHeight;
      setIsOverflowing(isOverflow);
    }
  }, [data.text]);

  return (
    <>
      <div className={`${styles.feedbackContainer} feedback-container`}>
        <div
          className={`${styles.imageContainer} feedbackImageContainer`}></div>
        {isOverflowing ? (
          <div className={styles.overflowTextContainer}>
            <p>{data.text}</p>
          </div>
        ) : (
          <div ref={textRef} className={styles.textContainer}>
            <p>{data.text}</p>
          </div>
        )}
        <div className={styles.infoContainer}>
          <p className={`small ${styles.dateContainer}`}>{data.date}</p>
          <p className={`small ${styles.dateContainer}`}>{data.city}</p>
        </div>
        {isOverflowing && (
          <div
            className={styles.linkContainer}
            onClick={() => {
              togglePopup(data);
            }}>
            <div className={styles.linkText}>Читать полностью</div>
            <div className={styles.iconContainer}>
              <svg className={styles.icon} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

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
