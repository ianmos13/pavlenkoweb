"use client";

import "swiper/css"
import { EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from "swiper/react"
import styles from "./CoverflowCardSwiper.module.scss"
import SectionWithSlider from "@/components/UI/SectionWithSlider/SectionWithSlider";
import React from "react";

export default function CoverflowCardSwiper(props) {
    const { data, titleOptions } = props
    const initialSlideIndex = data.length / 2

    return (
        <div className={styles.container}>
            <SectionWithSlider titleOptions={titleOptions}>
                <Swiper
                    className={styles.swiperContainer}
                    effect={"coverflow"}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    initialSlide={initialSlideIndex}
                    modules={[EffectCoverflow]}
                    coverflowEffect={{
                        rotate: 0,
                        slideShadows: false,
                    }}
                    breakpoints={{
                        320: {
                            coverflowEffect: { stretch: 0, depth: 0, modifier: 0 },
                        },
                        740: {
                            coverflowEffect: { stretch: -50, depth: 200, modifier: 2 },
                        }
                    }}>
                    {data && data?.map((card, idx) => (
                        <SwiperSlide key={idx} className={styles.swiperSlide}>
                            <CardSlide data={card} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </SectionWithSlider>
        </div>
    );
};

const CardSlide = ({ data }) => {
    return (
        <>
            <div className={styles.cardContainer}>
                <div className={styles.imageContainer}>
                    <img
                        src={data.image}
                        alt={`${data.name}'s photo`}
                        className={styles.image}
                    />
                </div>
                <div className={styles.infoContainer}>
                    <h4 className={styles.title}>{data.name}</h4>
                    <p className={styles.text}>{data.text}</p>
                </div>
            </div>
        </>
    );
};
