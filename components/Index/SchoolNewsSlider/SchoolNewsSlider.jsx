"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CardItem from "./CardItem/CardItem";
import "swiper/css";
import "swiper/css/effect-coverflow";
import styles from "./SchoolNewsSlider.module.scss";
import SectionWithSlider from "@/components/UI/SectionWithSlider/SectionWithSlider";
import { EffectCoverflow } from "swiper/modules";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";

export default function SchoolNewsSlider() {
  const titleOptions = {
    title: "Новости Школы",
    buttonText: "Все новости",
    buttonUrl: "/news",
  };

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("/article-categories?pagination[pageSize]=9999999");

  const {
    data: articlesData,
    loading: articlesLoading,
    error: articlesError,
  } = useFetch("/articles?sort=rank:asc&populate=*&pagination[pageSize]=9999999");
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const loading = categoriesLoading || articlesLoading;
  const error = categoriesError || articlesError;

  const news = React.useMemo(() => {
    if (!categoriesData || !articlesData) return [];

    return categoriesData
      .map((category) => ({
        name: category.category,
        article: articlesData
          .filter((article) => article.article_categorie?.id === category.id)
          .map((article) => ({
            id: article.id,
            header: article.header
              ? `${API_URL}${article.header.url}`
              : "/images/news_images/default-image.svg",
            title: article.title,
            body: article.body,
            category: category.category,
            date: new Date(article.date).toLocaleDateString(),
            link: `/news/${article.link}`,
          })),
      }))
      .flatMap((c) => c.article);
  }, [categoriesData, articlesData]);

  return (
    <SectionWithSlider titleOptions={titleOptions}>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <Swiper
          className={styles.swiperContainer}
          effect="coverflow"
          centeredSlides={true}
          initialSlide={news.length > 1 ? 1 : 0}
          slidesPerView="auto"
          modules={[EffectCoverflow]}
          coverflowEffect={{
            rotate: 0,
            slideShadows: false,
          }}
          breakpoints={{
            320: { coverflowEffect: { stretch: 0, depth: 0, modifier: 0 } },
            740: { coverflowEffect: { stretch: -35, depth: 185, modifier: 2 } },
            1025: { coverflowEffect: { stretch: -45, depth: 185, modifier: 2 } },
          }}>
          {news.map((article, idx) => (
            <SwiperSlide key={idx} className={styles.swiperSlide}>
              <CardItem
                key={article.id}
                header={article.header}
                title={article.title}
                body={article.body}
                category={article.category}
                date={article.date}
                link={article.link}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </SectionWithSlider>
  );
}
