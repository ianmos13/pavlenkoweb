"use client";
import React, { useMemo } from "react";
import styles from "./AboutAdministration.module.scss";
import PersonItem from "@/components/UI/PersonItem/PersonItem";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";

const AboutAdministration = () => {
  const {
    data: teamData,
    loading,
    error,
  } = useFetch("/school-teams?sort=rank:asc&populate=*&pagination[pageSize]=9999999");
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const administrators = useMemo(() => {
    if (!teamData) return [];

    return teamData
      .filter(
        (member) =>
          member.school_team_categorie?.category === "Административная команда"
      )
      .map((admin) => ({
        id: admin.id,
        name: admin.Name,
        position: admin.position,
        biography: admin.biography || "",
        avatar: admin.avatar
          ? `${API_URL}${admin.avatar?.url}`
          : "/images/default-avatar.svg",
        photo: admin.photo
          ? `${API_URL}${admin.photo?.url}`
          : "/images/default-photo.svg",
      }));
  }, [teamData]);

  return (
    <section className={`${styles.administrationContainer} container`}>
        <h2>Административная команда школы</h2>
        <div className={styles.ContainerInner}>
          <div className={styles.sideInfo}>
            <p>
              Над проектом Школы Павленко работают не только врачи и лучшие
              медицинские специалисты, но и слаженная команда организаторов.
            </p>
          </div>
          <div className={styles.content}>
            <Loader loading={loading} error={error}>
              <div className={styles.videoContainer}>
                <div className={styles.grid}>
                  {administrators.map((administrator) => (
                    <PersonItem
                      key={administrator.id}
                      name={administrator.name}
                      position={administrator.position}
                      biography={administrator.biography}
                      avatar={administrator.avatar}
                      photo={administrator.photo}
                    />
                  ))}
                </div>
              </div>
            </Loader>
          </div>
        </div>
    </section>
  );
};

export default AboutAdministration;
