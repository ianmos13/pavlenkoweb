"use client";

import React from "react";
import SliderWithPiceOfNextSlide from "@/components/UI/SliderWithPiceOfNextSlide/SliderWithPiceOfNextSlide";
import useFetch from "@/services/hook/useFetch";

const MostInteresting = () => {
  const {
    data: publicationsData,
    loading,
    error,
  } = useFetch("/publications?populate=*");
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const slideData = React.useMemo(() => {
    if (!publicationsData) return [];

    return publicationsData.map((item) => ({
      id: item.id,
      header: item.header
        ? `${API_URL}${item.header.url}`
        : "/images/default-image.svg",
      body: item.body,
      category: item.publication_categorie?.category || "Без категории",
      link: `/${item.link}`,
    }));
  }, [publicationsData]);
  const titleOptions = {
    title: "Самое интересное",
    buttonTheme: "youtube",
    buttonText: "Подписаться на канал",
    buttonUrl: "https://www.youtube.com/",
  };

  return (
    <>
      <SliderWithPiceOfNextSlide
        slideData={slideData}
        titleOptions={titleOptions}
      />
    </>
  );
};

export default MostInteresting;
