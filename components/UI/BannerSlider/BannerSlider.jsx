"use client";

import React, {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/effect-fade';
import styles from "./BannerSlider.module.scss";
import Banner from "@/components/UI/BannerSlider/Banner/Banner";
import {useDispatch} from "react-redux";
import {setTheme} from "@/redux/features/headerSlice";

export default function BannerSlider(props) {
    const { theme, data, size } = props

    const [bannerTheme, setBannerTheme] = useState(theme)
    const dispatch = useDispatch()
    const swiperRef = React.useRef(null)

    const handleSlideChange = (swiper) => {
        if(swiper && data.length > 0) {
            const currentSlideIndex = swiper.realIndex ? swiper.realIndex : 0
            const newTheme = data[currentSlideIndex].background
            dispatch(setTheme(newTheme))
            setBannerTheme(newTheme)
        }
    }

    return (
        <section className={`${styles.container} ${styles[`${bannerTheme}Container`]} ${styles[`${size}Container`]}`} >
            <Swiper
                onSwiper={swiper => (swiperRef.current = swiper)}
                onRealIndexChange={() => {
                    handleSlideChange(swiperRef.current)
                }}
                effect={'fade'}
                className={styles.swiperContainer}
                centeredSlides={true}
                loop={true}
                modules={[Autoplay, EffectFade]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
            >
                {data.map((banner, idx) => (
                    <SwiperSlide key={idx}>
                        <Banner
                            swiper={swiperRef.current}
                            size={size}
                            data={banner}
                            theme={bannerTheme}
                            currentSlide={idx + 1}
                            totalSlide={data.length}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};