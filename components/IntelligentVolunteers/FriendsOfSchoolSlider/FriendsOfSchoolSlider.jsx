"use client";

import "swiper/css";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import styles from "./FriendsOfSchoolSlider.module.scss";
import SectionWithSlider from "@/components/UI/SectionWithSlider/SectionWithSlider";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";

export default function FriendsOfSchoolSlider() {
  const {
    data: volunteersData,
    loading,
    error,
  } = useFetch("/intelligent-volunteers-sliders?populate=*");
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const formattedData = volunteersData.map((item) => ({
    text: item.text
      .map((paragraph) =>
        paragraph.children.map((child) => child.text).join("")
      )
      .join("\n"),
    image: item.image
      ? `${API_URL}${item.image.url}`
      : "/images/default-avatar.svg",
  }));

  if (formattedData.length > 0 && formattedData.length < 6) {
    const originalLength = formattedData.length;
    while (formattedData.length < 6) {
      formattedData.push(...formattedData.slice(0, 6 - formattedData.length));
    }
  }
  const titleOptions = {
    title: "Друзья Школы Павленко",
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
                slideShadows: false,
              }}
              breakpoints={{
                320: {
                  coverflowEffect: { stretch: 0, depth: 0, modifier: 0 },
                },
                740: {
                  coverflowEffect: { stretch: -50, depth: 200, modifier: 2 },
                },
                1025: {
                  coverflowEffect: { stretch: -70, depth: 200, modifier: 2 },
                },
              }}>
              {formattedData &&
                formattedData?.map((feedback, idx) => (
                  <SwiperSlide key={idx} className={styles.swiperSlide}>
                    <CardSlide data={feedback} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </>
        </SectionWithSlider>
      </div>
    </Loader>
  );
}

const CardSlide = ({ data }) => {
  return (
    <>
      <div className={`${styles.cardContainer} friends-of-school-container`}>
        <img
          src={data.image}
          alt={`${data.name}'s photo`}
          className={styles.imageContainer}
        />
        <div
          className={`${styles.textContainer} friends-of-school-text-container`}>
          <div className={styles.track}>
            <span>
              <h4>{data.text}</h4>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
