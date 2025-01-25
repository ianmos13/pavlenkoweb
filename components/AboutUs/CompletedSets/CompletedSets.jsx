"use client";
import SliderWithPiceOfNextSlide from "@/components/UI/SliderWithPiceOfNextSlide/SliderWithPiceOfNextSlide";
import useEnrolmentData from "@/services/hook/useEnrolmentData";
import Loader from "@/components/UI/Loader/Loader";

const CompletedSetsSlider = () => {
  const { enrolmentDatas, loading, error } = useEnrolmentData();

  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const slideData = enrolmentDatas?.map((enrolment) => ({
    id: enrolment.id,
    title: enrolment.title,
    header: `${API_URL}${enrolment.img?.url}`,
    body: enrolment.description || enrolment.body, 
    category: enrolment.years,
    link: `/completed-enrolments/${enrolment.link}`,
  })) || [];

  const titleOptions = {
    title: "Завершенные наборы",
  };

  return (
    <Loader loading={loading}>
      <SliderWithPiceOfNextSlide
        slideData={slideData}
        titleOptions={titleOptions}
        imageCover={true}
        slideIndex={1}
      />
    </Loader>
  );
};

export default CompletedSetsSlider;
