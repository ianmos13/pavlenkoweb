"use client";

import React from "react";
import SliderWithPiceOfNextSlide from "@/components/UI/SliderWithPiceOfNextSlide/SliderWithPiceOfNextSlide";
import useFetch from "@/services/hook/useFetch";

const MostInteresting = () => {
  const {
    data: publicationsData,
    loading,
    error,
  } = useFetch("/club-most-interestings?populate=*&pagination[pageSize]=9999999");
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const slideData = React.useMemo(() => {
    if (!publicationsData) return [];

    return publicationsData.map((item) => ({
      id: item.id,
      header: item.header
        ? `${API_URL}${item.header.url}`
        : "/images/default-image.svg",
      body: item.body,
      category: "Видео",
      link: `${item.link}`,
    }));
  }, [publicationsData]);
  const titleOptions = {
    title: "Самое интересное",
    buttonTheme: "youtube",
    buttonText: "Подписаться на канал",
    buttonUrl: "https://www.youtube.com/@4surgeonsclub260",
  };

  return (
    <>
      <SliderWithPiceOfNextSlide
        slideData={slideData}
        titleOptions={titleOptions}
        imageCover={true}
        slideIndex={2}
      />
    </>
  );
};

export default MostInteresting;
