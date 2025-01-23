"use client";

import CoverflowCardSwiper from "@/components/UI/CoverflowCardSwiper/CoverflowCardSwiper";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";

export default function TeachersSwiper() {
    const {
        data: teachersData,
        loading,
        error,
      } = useFetch("/teaching-staff-teacher-sliders?sort=rank:asc&populate=*");
      const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

      const parsedData =
      teachersData?.map((expert) => ({
          image: expert.image
            ? `${API_URL}${expert.image.url}`
            : "/images/default-avatar.svg",
          name: expert.name,
          text: expert.text
            .map((paragraph) =>
              paragraph.children.map((child) => child.text).join("")
            )
            .join("\n"),
        })) || [];
    
      return (
        <Loader loading={loading}>
          {error ? (
            <div>Ошибка загрузки данных: {error.message}</div>
          ) : (
            <CoverflowCardSwiper
              data={parsedData}
              titleOptions={teachersSwiperOptions}
            />
          )}
        </Loader>
      );
    }
 


const teachersSwiperOptions = {
    title: "Преподаватели",
    containerStyles: { backgroundColor: "#f2f5fa" },
};