"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import styles from "./FriendsOfSchoolSlider.module.scss";
import SectionWithSlider from "@/components/UI/SectionWithSlider/SectionWithSlider";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
import CustomCoverflowSlider from "@/components/UI/CustomCoverflowSlider/CustomCoverflowSlider";
import FriendsOfSchoolSlide from "@/components/UI/CustomCoverflowSlider/FriendsOfSchoolSlide/FriendsOfSchoolSlide";

export default function FriendsOfSchoolSlider() {
  const {
    data: volunteersData,
    loading,
    error,
  } = useFetch("/intelligent-volunteers-sliders?sort=rank:asc&populate=*&pagination[pageSize]=9999999");
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const formattedData = volunteersData.map((item) => ({
    text: item.text
      .map((paragraph) =>
        paragraph.children.map((child) => child.text).join("")
      )
      .join("\n"),
    image: item.image
      ? `${API_URL}${item.image.url}`
      : "/images/default-avatar.svg",
  }));

  if (formattedData.length > 0 && formattedData.length < 6) {
    while (formattedData.length < 6) {
      formattedData.push(...formattedData.slice(0, 6 - formattedData.length));
    }
  }
  const titleOptions = {
    title: "Друзья Школы Павленко",
  };

  return (
    <Loader loading={loading}>
      <AnimatedComponent>
      <div className={styles.container}>
        <SectionWithSlider titleOptions={titleOptions}>
          <>
            <div className={styles.desktopSwiper}>
              {formattedData && <CustomCoverflowSlider data={formattedData} type={'friendsOfSchoolSlide'}/>}
            </div>
            <div className={styles.mobileSwiper}>
              <Swiper
                className={styles.swiperContainer}
                effect={"coverflow"}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                modules={[EffectCoverflow]}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 0,
                  slideShadows: false,
                  modifier: 0,
                }}>
                {formattedData &&
                  formattedData?.map((feedback, idx) => (
                    <SwiperSlide key={idx} className={styles.swiperSlide}>
                      <FriendsOfSchoolSlide data={feedback} isActive={false} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </>
        </SectionWithSlider>
      </div>
      </AnimatedComponent>
    </Loader>
  );
}

