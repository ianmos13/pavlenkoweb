"use client";

import "swiper/css"
import { EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from "swiper/react"
import styles from "./CoverflowCardSwiper.module.scss"
import SectionWithSlider from "@/components/UI/SectionWithSlider/SectionWithSlider";
import CustomCoverflowSlider from "@/components/UI/CustomCoverflowSlider/CustomCoverflowSlider";
import MemberCardSlide from "@/components/UI/CustomCoverflowSlider/MemberCardSlide/MemberCardSlide";

export default function CoverflowCardSwiper(props) {
    const { data, titleOptions } = props
    const initialSlideIndex = data.length / 2

    return (
        <div className={styles.container}>
            <SectionWithSlider titleOptions={titleOptions}>
                <>
                    <div className={styles.desktopSwiper}>
                        {data && <CustomCoverflowSlider data={data} type={'memberCardSlide'}/>}
                    </div>
                    <div className={styles.mobileSwiper}>
                        <Swiper
                            className={styles.swiperContainer}
                            effect={"coverflow"}
                            centeredSlides={true}
                            loop={true}
                            slidesPerView={"auto"}
                            initialSlide={initialSlideIndex}
                            modules={[EffectCoverflow]}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 0,
                                slideShadows: false,
                                modifier: 0,
                            }}
                        >
                            {data && data?.map((card, idx) => (
                                <SwiperSlide key={idx} className={styles.swiperSlide}>
                                    <MemberCardSlide data={card} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </>
            </SectionWithSlider>
        </div>
    );
};
