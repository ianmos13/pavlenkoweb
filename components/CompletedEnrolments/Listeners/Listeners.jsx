'use client'
import styles from "./Listeners.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Listeners = ({graduates}) => {
  return (
    <div className={styles.container}>
      <h2>Слушатели</h2>
      <div className={styles.gridGraduates}>
        {graduates.map((graduate, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.name}>
              <h5>{graduate.name} {graduate.secondName}</h5>
            </div>
            <img
              src={graduate.image}
              alt={graduate.name}
              className={styles.image}
            />
          </div>
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
              <div key={index} className={styles.card}>
                <div className={styles.name}>
                  <h5>{graduate.name} {graduate.secondName}</h5>
                </div>
                <img
                  src={graduate.image}
                  alt={graduate.name}
                  className={styles.image}
                />
              </div>
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Listeners;


const swiperBreakpoints = {
  740: {
    slidesPerView: 1.7,
    spaceBetween: 16,
  },
  800: {
    slidesPerView: 1.82,
  },
  870: {
    slidesPerView: 1.98,
  },
  960: {
    slidesPerView: 2.19,
  }
}
