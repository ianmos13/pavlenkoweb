"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./Graduates.module.scss";

const graduates = [
  {
    name: "Максим ",
    secondName: "Попов",
    image: "/images/graduates/maxim-popov.svg",
  },
  {
    name: "Эмиль",
    secondName: "Чир-Чир",
    image: "/images/graduates/emil-chirchir.svg",
  },
  {
    name: "Илья",
    secondName: "Скляр",
    image: "/images/graduates/ilya-sklyar.svg",
  },
  {
    name: "Даниил",
    secondName: "Синотин",
    image: "/images/graduates/daniil-sinotin.svg",
  },
];

const Graduates = () => {
  return (
    <div className={styles.container}>
      <h2>При участии наших выпускников</h2>
      <div className={styles.gridGraduates}>
        {graduates.map((graduate, index) => (
          <Graduate key={index} graduate={graduate} />
        ))}
      </div>
      <Swiper
        className={styles.swiperContainer}
        spaceBetween={16}
        initialSlide={1}
        centeredSlides={true}
        centerInsufficientSlides={true}
        breakpoints={swiperBreakpoints}
      >
        {graduates.map((graduate, index) => (
            <SwiperSlide key={index}>
              <Graduate graduate={graduate} />
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Graduates;

const Graduate = ({ graduate }) => {
  return (
    <div className={styles.card}>
      <div className={styles.name}>
        <h5>{graduate.name}</h5>
        <h5>{graduate.secondName}</h5>
      </div>

      <img
        src={graduate.image}
        alt={graduate.name}
        className={styles.image}
      />
    </div>
  )
}

const swiperBreakpoints = {
  740: {
    slidesPerView: 2.25,
    spaceBetween: 16,
  },
  840: {
    slidesPerView: 2.55,
  },
  950: {
    slidesPerView: 2.86,
  }
}