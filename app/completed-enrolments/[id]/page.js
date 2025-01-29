"use client";
import { useParams, useRouter } from "next/navigation";
import TitleWithBackButton from "@/components/UI/TitleWithBackButton/TitleWithBackButton";
import ImageWithDescription from "@/components/UI/ImageWithDescription/ImageWithDescription";
import MentorsAndGraduates from "@/components/CompletedEnrolments/MentorsAndGraduates/MentorsAndGraduates";
import Listeners from "@/components/CompletedEnrolments/Listeners/Listeners";
import useEnrolmentData from "@/services/hook/useEnrolmentData";
import Loader from "@/components/UI/Loader/Loader";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

const CompletedEnrolmentPage = () => {
  const { id } = useParams();
  const { enrolmentDatas, loading, error } = useEnrolmentData();
  const enrolmentData = enrolmentDatas?.find((enrolment) => enrolment.link === id);

  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;


  return (
    <Loader loading={loading}>
      {enrolmentData && (
        <>
          <AnimatedComponent>
            <TitleWithBackButton title={enrolmentData.title} />
          </AnimatedComponent>
          <AnimatedComponent>
            <ImageWithDescription
              imgPath={`${API_URL}${enrolmentData.img.url}`}
              textOverlay={enrolmentData.textOverlayImg}
              years={enrolmentData.years}
            />
          </AnimatedComponent>
          <MentorsAndGraduates
              people={enrolmentData.people.map((person) => ({
                name: person.name,
                avatar: `${API_URL}${person.avatar}`,
                biography: person.biography,
                city: person.city,
                position: person.position,
              }))}
          />
          <AnimatedComponent>
            <Listeners
              graduates={enrolmentData.listeners.map((listener) => ({
                name: listener.name,
                secondName: listener.secondName,
                image: `${API_URL}${listener.image}`,
              }))}
            />
          </AnimatedComponent>
        </>
      )}
    </Loader>
  );
};

export default CompletedEnrolmentPage;
