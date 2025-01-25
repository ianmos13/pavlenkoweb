"use client";
import React from "react";
import styles from "./TeachingStaff.module.scss";
import ContainerWithSidebar from "@/components/UI/ContainerWithSidebar/ContainerWithSidebar";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

const TeachingStaff = ({ bottom, top, showonly }) => {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("/teaching-stuff-categories?pagination[pageSize]=9999999");

  const {
    data: staffData,
    loading: staffLoading,
    error: staffError,
  } = useFetch("/teaching-stuffs?sort=rank:asc&populate=*&pagination[pageSize]=9999999");
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const loading = categoriesLoading || staffLoading;
  const error = categoriesError || staffError;

  const teachingData = React.useMemo(() => {
    if (!categoriesData || !staffData) {
      return null;
    }

    let filteredCategories = categoriesData;


    if (showonly && showonly.length > 0) {
      filteredCategories = categoriesData.filter((category) =>
        showonly.includes(category.category)
      );
    }

    const mappedData = {
      categories: filteredCategories.map((category, index) => ({
        id: index + 1,
        name: category.category,
        stufs: staffData
          .filter(
            (member) =>
              member.teaching_stuff_categorie &&
              member.teaching_stuff_categorie.id === category.id
          )
          .map((member) => ({
            id: member.id,
            name: member.name,
            position: member.position,
            biography: member.biography,
            location: member.city,
            avatar: member.avatar
              ? `${API_URL}${member.avatar?.url}`
              : "/images/default-avatar.svg",
            photo: member.photo
              ? `${API_URL}${member.photo?.url}`
              : "/images/default-photo.svg",
          })),
      })),
    };

    return mappedData;
  }, [categoriesData, staffData, showonly]);

  return (
    <div
      className={`
        ${styles.staffContainer}
        container
        ${bottom ? styles.bottom : ""}
        ${top ? styles.top : ""}
      `}
    >
      <h2>Наставники</h2>
      <Loader loading={loading}>
        <AnimatedComponent>
          <ContainerWithSidebar
            data={teachingData}
            type={"TeachingStaff"}
            showAllCategoriesFilters={true}
          />
        </AnimatedComponent>
      </Loader>
    </div>
  );
};

export default TeachingStaff;
