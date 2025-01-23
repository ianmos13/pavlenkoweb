"use client";

import CardItem from "@/components/UI/Cards/CardItem/CardItem";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionWithSlider from "@/components/UI/SectionWithSlider/SectionWithSlider";
import styles from "./SliderWithPiceOfNextSlide.module.scss";

const SliderWithPiceOfNextSlide = ({ slideData, titleOptions, imageCover, slideIndex }) => {

  const collectInitialSlide = () => {
    if(slideData.length <= 1) return 0
    if(slideData.length <= 3) return 1
    return slideIndex
  }

  return (
    <SectionWithSlider titleOptions={titleOptions}>
      <>
        <div className={slideData?.length <= 3 ? styles.cardItems : styles.itemsClass}>
          {slideData.map((slide) => (
            <CardItem
              key={slide.id}
              title={slide.title}
              header={slide.header}
              body={slide.body}
              category={slide.category}
              link={slide.link}
              imageCover={imageCover}
            />
          ))}
        </div>
        <Swiper
          className={slideData?.length <= 3 ? styles.swiperClass : styles.swiperContainer}
          centeredSlides={true}
          spaceBetween={16}
          initialSlide={collectInitialSlide}
          breakpoints={swiperBreakpoints}
        >
          {slideData.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <CardItem
                title={slide.title}
                header={slide.header}
                body={slide.body}
                category={slide.category}
                link={slide.link}
                imageCover={imageCover}
                target={'_blank'}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </SectionWithSlider>
  );
};

export default SliderWithPiceOfNextSlide;

const swiperBreakpoints = {
  320: {
    slidesPerView: 1.5,
    spaceBetween: 16,
  },
  340: {
    slidesPerView: 1.6,
  },
  375: {
    slidesPerView: 1.7,
  },
  400: {
    slidesPerView: 1.8,
  },
  440: {
    slidesPerView: 1.9,
  },
  480: {
    slidesPerView: 2.1,
  },
  530: {
    slidesPerView: 2.4,
  },
  580: {
    slidesPerView: 2.6,
  },
  650: {
    slidesPerView: 3,
  },
  680: {
    slidesPerView: 3.1,
  },
  740: {
    slidesPerView: 2.2,
  },
  840: {
    slidesPerView: 2.5,
  },
  950: {
    slidesPerView: 2.8,
  },
  1025: {
    slidesPerView: 2.3,
  },
  1150: {
    slidesPerView: 2.5,
  },
  1250: {
    slidesPerView: 2.8,
  },
  1330: {
    slidesPerView: 3,
  },
  1380: {
    slidesPerView: 3.1,
  },
  1440: {
    slidesPerView: 3.2,
  },
  1600: {
    slidesPerView: 3.6,
  },
  1800: {
    slidesPerView: 4,
  },
  2300: {
    slidesPerView: 5.1,
  },
};
