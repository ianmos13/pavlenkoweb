"use client";
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules";;
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./Oferta.module.scss";

const Oferta = () => {
  return (
    <section className={styles.container}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div className={styles.imageContainer}>
            <img src="/images/oferta.png" alt="oferta" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.imageContainer}>
            <img src="/images/oferta1.png" alt="oferta2" />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Oferta;
