"use client";
import React from "react";
import styles from "./Recomendation.module.scss";
import MarketCard from "@/components/UI/MarketCard/MarketCard";
import useFetchProducts from "@/services/hook/useFetchProducts";
import Loader from "@/components/UI/Loader/Loader";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const getRandomItems = (array, count) => {
  const shuffled = array.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const Recomendation = () => {
  const { products, loading, error } = useFetchProducts();


  if (loading) return <Loader loading={loading} />;
  if (error) return <div>Произошла ошибка при загрузке данных.</div>;

  const randomItems = getRandomItems(products, 3);

  return (
    <div className={styles.container}>
      <h2>Может заинтересовать</h2>
      <div className={styles.gridContainer}>
        {randomItems.map((item) => (
          <MarketCard
            key={item.id}
            title={item.title}
            img={item.img}
            price={item.price}
            discontPrice={item.discontPrice}
            description={item.description}
            link={item.link}
          />
        ))}
      </div>
      <Swiper
        className={styles.swiperContainer}
        centeredSlides={true}
        spaceBetween={16}
        initialSlide={1}
        breakpoints={swiperBreakpoints}
      >
        {randomItems.map((item, idx) => (
          <SwiperSlide key={idx}>
            <MarketCard
              key={item.id}
              title={item.title}
              img={item.img}
              price={item.price}
              discontPrice={item.discontPrice}
              description={item.description}
              link={item.link}
              inSwiper={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recomendation;

const swiperBreakpoints = {
    320: {
        slidesPerView: 1.11,
        spaceBetween: 8,
    },
    340: {
        slidesPerView: 1.17,
    },
    375: {
        slidesPerView: 1.2,

    },
    400: {
        slidesPerView: 1.3,
    },
    440: {
        slidesPerView: 1.35,
    },
    480: {
        slidesPerView: 1.45,

    },
    530: {
        slidesPerView: 1.6,
        spaceBetween: 12,
    },
    580: {
        slidesPerView: 1.8,
    },
    650: {
        slidesPerView: 2,
    },
    680: {
        slidesPerView: 2.2,
    },
    740: {
        slidesPerView: 2.2,
    },
    840: {
        slidesPerView: 2.5,
    },
    950: {
        slidesPerView: 2.8,
    }
}