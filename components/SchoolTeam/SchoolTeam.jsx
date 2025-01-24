"use client";
import ContainerWithSidebar from "@/components/UI/ContainerWithSidebar/ContainerWithSidebar"
import Loader from "@/components/UI/Loader/Loader"
import useFetch from "@/services/hook/useFetch"
import React from "react"
import styles from "./SchoolTeam.module.scss"

const SchoolTeam = () => {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("/school-team-categories?sort=rank:asc&pagination[pageSize]=9999999");

  const {
    data: staffData,
    loading: staffLoading,
    error: staffError,
  } = useFetch("/school-teams?sort=rank:asc&populate=*&pagination[pageSize]=9999999");
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const loading = categoriesLoading || staffLoading;
  const error = categoriesError || staffError;

  const teamData = React.useMemo(() => {
    if (!categoriesData || !staffData) {
      return null;
    }

    const mappedData = {
      categories: categoriesData.map((category, index) => ({
        id: index + 1,
        name: category.category,
        stufs: staffData
          .filter(
            (member) =>
              member.school_team_categorie &&
              member.school_team_categorie.id === category.id
          )

          .map((member) => ({
            id: member.id,
            name: member.Name,
            position: member.position,
            biography: member.biography,
            avatar: member.avatar
              ? `${API_URL}${member.avatar.url}`
              : "/images/default-avatar.svg",
            photo: member.photo
              ? `${API_URL}${member.photo.url}`
              : "/images/default-photo.svg",
          })),
      })),
    };

    return mappedData;
  }, [categoriesData, staffData]);

  return (
    <div className={styles.staffContainer}>
      <Loader loading={loading}>
        <ContainerWithSidebar
          data={teamData}
          type={"SchoolTeam"}
          showAllCategoriesFilters={false}
        />
      </Loader>
    </div>
  );
};

export default SchoolTeam;
