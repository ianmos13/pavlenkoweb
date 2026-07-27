"use client";

import React from "react";

import useFetch from "@/services/hook/useFetch";
import { PAGE_SIZE } from "@/lib/pagination";
import Loader from "@/components/UI/Loader/Loader";
import BannerSlider from "@/components/Index/BannersSection/BannerSlider/BannerSlider";

function normalizeMediaUrl(url, apiUrl) {
  if(!url) return "/images/default-banner.png";

  return `${apiUrl}${url}`;
}

const BannersSection = () => {
  const { data: bannersData, loading, error } = useFetch(`/index-banner-sliders?sort=rank:asc&populate=*&pagination[pageSize]=${PAGE_SIZE}`);
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const formattedBannersData = React.useMemo(() => {
    if (!bannersData) return [];

    return bannersData.map((banner) => ({
      id: banner.id,
      background: banner.theme?.name || "lightAndDark",
      headerData: banner.headerData ? banner.headerData.map((header, index) => ({
        id: index,
        text: header.text,
        className: header.className,
      })) : [],
      cardsData: banner.cardsData ? banner.cardsData.map((card, index) => ({
        id: card,
        text: card.text,
        title: card.title,
      })) : [],
      imageOverview: banner.imageOverview,
      listData: banner.listData || [],
      image: normalizeMediaUrl(banner.image?.url, API_URL),
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
          <BannerSlider data={formattedBannersData} size={"large"} theme={"lightAndDark"} />
        ) : (
          <p>Нет данных для отображения баннеров.</p>
        )}
      </Loader>
    </div>
  );
};

export default BannersSection;
