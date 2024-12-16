"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import styles from "./BannerSlider.module.scss";
import Banner from "@/components/UI/BannerSlider/Banner/Banner";

export default function BannerSlider(props) {
    const { theme, data, size } = props

    const pagination = {
      clickable: true,
      horizontalClass: styles.pagination,
      bulletActiveClass: styles.paginationBulletActive,
      renderBullet: function (index, className) {
        return '<span class="' + className + ' ' + styles.paginationBullet + '"></span>';
      },
    };

    return (
        <section className={`${styles.container} ${styles[`${theme}Container`]} ${styles[`${size}Container`]}`} >
            <Swiper
                className={styles.swiperContainer}
                centeredSlides={true}
                loop={true}
                pagination={pagination}
                modules={[Pagination]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                initialSlide={1}
            >
                {data.map((banner, idx) => (
                    <SwiperSlide key={idx}>
                        <Banner size={size} data={banner} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};