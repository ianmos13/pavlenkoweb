"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CardItem from "./CardItem/CardItem";
import "swiper/css";
import "swiper/css/effect-coverflow";
import styles from "./SchoolNewsSlider.module.scss";
import SectionWithSlider from "@/components/UI/SectionWithSlider/SectionWithSlider";
import {EffectCoverflow, Pagination} from "swiper/modules";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
import CustomCoverflowSlider from "@/components/Index/SchoolNewsSlider/CustomCoverflowSlider/CustomCoverflowSlider";

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
  } = useFetch("/articles?sort=date:desc&populate=*&pagination[pageSize]=9999999");
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const loading = categoriesLoading || articlesLoading;
  const error = categoriesError || articlesError;

  const news = React.useMemo(() => {
    if (!categoriesData || !articlesData) return [];

    const categoriesHash = categoriesData.reduce((acc, item) => {
        acc[item.id] = item.name;
        return acc;
    }, {});

    return articlesData.map((article) => ({
        id: article.id,
        header: article.header
            ? `${API_URL}${article.header.url}`
            : "/images/news_images/default-image.svg",
        title: article.title,
        body: article.body,
        category: categoriesHash[article.article_categorie?.id],
        date: new Date(article.date).toLocaleDateString(),
        link: `/news/${article.link}`,
    }))
  }, [categoriesData, articlesData]);

  return (
    <SectionWithSlider titleOptions={titleOptions}>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <AnimatedComponent>
          <div className={styles.desktopSwiper}>
            <CustomCoverflowSlider data={news} type={'newsCard'}/>
          </div>
          <div className={styles.mobileSwiper}>
            <Swiper
              className={styles.swiperContainer}
              effect="coverflow"
              centeredSlides={true}
              initialSlide={news.length < 3 ? 0 : news.length < 5 ? 1 : 2 }
              slidesPerView="auto"
              modules={[EffectCoverflow, Pagination]}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 0,
                slideShadows: false,
                modifier: 0,
              }}
            >
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
          </div>
        </AnimatedComponent>
      )}
    </SectionWithSlider>
  );
}
