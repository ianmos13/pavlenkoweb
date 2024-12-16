"use client";
import React from "react";
import BannerSlider from "@/components/UI/BannerSlider/BannerSlider";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";

const BannersSection = () => {

  const { data: bannersData, loading, error } = useFetch("/index-banner-sliders?populate=*");
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;


  const formattedBannersData = React.useMemo(() => {
    if (!bannersData) return [];

    return bannersData.map((banner) => ({
      id: banner.id,
      background: banner.background || "dark",
      headerData: banner.headerData.map((header, index) => ({
        id: index,
        text: header.text,
        className: header.className,
      })),
      image: banner.image?.url ? `${API_URL}${banner.image.url}` : "/images/default-banner.png",
      body: banner.body,
      buttonText: banner.buttonText,
      buttonLink: banner.buttonLink,
    }));
  }, [bannersData]);

  if (error) {
    return <p>Ошибка загрузки данных: {error.message}</p>;
  }

  return (
    <div>
      <Loader loading={loading}>
        {formattedBannersData.length > 0 ? (
          <BannerSlider data={formattedBannersData} size={"large"} theme={"dark"} />
        ) : (
          <p>Нет данных для отображения баннеров.</p>
        )}
      </Loader>
    </div>
  );
};

export default BannersSection;
