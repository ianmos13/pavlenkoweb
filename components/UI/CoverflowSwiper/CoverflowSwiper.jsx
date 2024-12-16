"use client";

import "swiper/css"
import "swiper/css/pagination"
import { EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from "swiper/react"
import styles from "./CoverflowSwiper.module.scss"

export default function CoverflowSwiper(props) {
    const { data } = props

    return (
        <div className={styles.container}>
            <Swiper
                className={styles.swiperContainer}
                effect={'coverflow'}
                centeredSlides={true}
                loop={true}
                initialSlide={1}
                slidesPerView={"auto"}
                modules={[EffectCoverflow]}
                coverflowEffect={{
                    rotate: 0,
                    stretch: -70,
                    depth: 200,
                    modifier: 2,
                    slideShadows: false,
                }}
                breakpoints={{
                    320: {
                        coverflowEffect: {stretch: -35},
                    },
                    740: {
                        coverflowEffect: {stretch: -65},
                    },
                    1025: {
                        coverflowEffect: {stretch: -70}
                    }
                }}
            >
                {data.map((article, idx) => (
                    <SwiperSlide key={idx} className={styles.swiperSlide}>
                        <div className={styles.imageContainer} >
                            <img src={article} alt="" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};