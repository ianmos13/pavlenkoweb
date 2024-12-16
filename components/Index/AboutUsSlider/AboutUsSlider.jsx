"use client";
import React from "react";
import useFetch from "@/services/hook/useFetch";
import SliderWithPiceOfNextSlide from "@/components/UI/SliderWithPiceOfNextSlide/SliderWithPiceOfNextSlide";
import Loader from "@/components/UI/Loader/Loader";

const AboutUsSlider = () => {
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
    title: "Говорят о нас",
    buttonText: "Все публикации",
    buttonUrl: "/publications",
  };
  const cartType = 'aboutUs'

  return (
    <>
      <Loader loading={loading}>
        <SliderWithPiceOfNextSlide
          slideData={slideData}
          titleOptions={titleOptions}
          cardType={cartType}
        />
      </Loader>
    </>
  );
};

export default AboutUsSlider;
