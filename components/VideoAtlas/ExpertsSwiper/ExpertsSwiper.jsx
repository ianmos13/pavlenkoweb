"use client";

import CoverflowCardSwiper from "@/components/UI/CoverflowCardSwiper/CoverflowCardSwiper";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";

export default function ExpertsSwiper() {
  const {
    data: expertData,
    loading,
    error,
  } = useFetch("/video-atlas-expert-sliders?populate=*");
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const parsedData =
    expertData?.map((expert) => ({
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
          titleOptions={expertsSwiperOptions}
        />
      )}
    </Loader>
  );
}

const expertsSwiperOptions = {
  title: "Наши эксперты",
  containerStyles: { backgroundColor: "#f2f5fa" },
};
