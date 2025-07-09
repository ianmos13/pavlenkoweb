"use client";
import ContainerWithSidebarSchoolTeam from "./ContainerWithSidebarSchoolTeam";
import Loader from "@/components/UI/Loader/Loader";
import useFetch from "@/services/hook/useFetch";
import React from "react";
import styles from "./SchoolTeam.module.scss";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

const SchoolTeam = () => {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch(
    "/school-team-categories?sort=rank:asc&pagination[pageSize]=9999999&populate=*"
  );

  const {
    data: staffData,
    loading: staffLoading,
    error: staffError,
  } = useFetch(
    "/school-teams?sort=rank:asc&populate=*&pagination[pageSize]=9999999"
  );
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const loading = categoriesLoading || staffLoading;
  const error = categoriesError || staffError;

  const teamData = React.useMemo(() => {
    if (!categoriesData || !staffData) {
      return null;
    }


    const mainCategoryNames = categoriesData
      .filter((cat) => !cat.subcategory)
      .map((cat) => cat.category);


    const categoryById = {};
    categoriesData.forEach((cat) => {
      categoryById[cat.id] = cat;
    });


    const mainCategories = categoriesData
      .filter((cat) => mainCategoryNames.includes(cat.category))
      .map((cat) => {

        const subcategories = categoriesData
          .filter(
            (subcat) => subcat.subcategory && subcat.subcategory.id === cat.id
          )
          .map((subcat) => ({
            id: subcat.id,
            name: subcat.category,
            stufs: staffData
              .filter(
                (member) =>
                  member.school_team_categorie &&
                  member.school_team_categorie.id === subcat.id
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
          }))
          .filter((subcat) => subcat.stufs && subcat.stufs.length > 0); // <-- фильтрация


        const stufs = staffData
          .filter(
            (member) =>
              member.school_team_categorie &&
              member.school_team_categorie.id === cat.id
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
          }));

        return {
          id: cat.id,
          name: cat.category,
          stufs,
          subcategories,
        };
      });

    const result = { categories: mainCategories };
    return result;
  }, [categoriesData, staffData]);

  return (
    <div className={styles.staffContainer}>
      <Loader loading={loading}>
        <AnimatedComponent>
          <ContainerWithSidebarSchoolTeam data={teamData} />
        </AnimatedComponent>
      </Loader>
    </div>
  );
};

export default SchoolTeam;
