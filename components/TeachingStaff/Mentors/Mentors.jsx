"use client";
import React from "react";
import styles from "./Mentors.module.scss";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

const Mentors = ({ bottom, top }) => {
  const {
    data: mentorsResponse,
    loading: mentorsLoading,
    error: mentorsError,
  } = useFetch("/mentors?populate=*&pagination[pageSize]=9999999");
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const formattedMentorsData = React.useMemo(() => {
    return (
      mentorsResponse?.map((mentor) => ({
        id: mentor.id,
        name: mentor.Name,
        description: mentor.Description,
        link: mentor.link,
        photo: mentor.photo
          ? `${API_URL}${mentor.photo?.url}`
          : "/images/default-photo.svg",
      })) || []
    );
  }, [mentorsResponse]);

  return (
    <div className={styles.mentorsContainer}>
      <div className={styles.title}>
        <h2>Менторы</h2>
      </div>
      <Loader loading={mentorsLoading}>
        <AnimatedComponent>
            <div className={styles.gridContainer}>
              {formattedMentorsData.map((mentor) => (
                <div key={mentor.id} className={styles.gridItem}>
                  <div className={styles.textContent}>
                    <div className={styles.name}>
                      <h5>{mentor.name}</h5>
                    </div>
                    <div className={styles.description}>
                      <p>{mentor.description}</p>
                    </div>
                  </div>
                  <div className={styles.imageWrapper}>
                    <img
                      src={mentor.photo}
                      alt={mentor.name}
                      className={styles.avatar}
                    />
                  </div>
                </div>
              ))}
            </div>
        </AnimatedComponent>
      </Loader>
    </div>
  );
};

export default Mentors;
