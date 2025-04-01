"use client";
import React from "react";
import useFetch from "@/services/hook/useFetch";
import SliderWithPiceOfNextSlide from "@/components/UI/SliderWithPiceOfNextSlide/SliderWithPiceOfNextSlide";
import Loader from "@/components/UI/Loader/Loader";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

const AboutUsSlider = () => {
  const {
    data: publicationsData,
    loading,
    error,
  } = useFetch("/publications?sort=rank:asc&populate=*&pagination[pageSize]=9999999");
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
      link: `${item.link}`,
    }));
  }, [publicationsData]);

  const titleOptions = {
    title: "Говорят о\u00A0нас",
    buttonText: "Все публикации",
    buttonUrl: "/publications",
  };

  return (
    <>
      <Loader loading={loading}>
        <AnimatedComponent>
        <SliderWithPiceOfNextSlide
          slideData={slideData}
          titleOptions={titleOptions}
          slideIndex={3}
        />
        </AnimatedComponent>
      </Loader>
    </>
  );
};

export default AboutUsSlider;
