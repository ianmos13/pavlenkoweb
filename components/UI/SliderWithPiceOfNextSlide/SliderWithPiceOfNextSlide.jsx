"use client";

import CardItem from "@/components/UI/Cards/CardItem/CardItem";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionWithSlider from "@/components/UI/SectionWithSlider/SectionWithSlider";
import styles from "./SliderWithPiceOfNextSlide.module.scss";
import {useEffect, useRef} from "react";

const SliderWithPiceOfNextSlide = ({ slideData, titleOptions, imageCover, slideIndex }) => {
  const swiperRef = useRef()

  useEffect(() => {
    const swiper = swiperRef.current
    if(slideData.length <= 1) return
    if(slideData.length <= 3) {
      swiper.slideNext()
    } else {
      for(let i = 0; i < slideIndex ; i+=1)
        swiper.slideNext();
    }
  }, []);

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
              target={'_blank'}
            />
          ))}
        </div>
        <Swiper
          onSwiper={swiper => (swiperRef.current = swiper)}
          className={slideData?.length <= 3 ? styles.swiperClass : styles.swiperContainer}
          centeredSlides={true}
          slidesPerView={"auto"}
          spaceBetween={16}
        >
          {slideData.map((slide, idx) => (
            <SwiperSlide className={styles.swiperSlide} key={idx} style={{width: 'unset'}}>
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
