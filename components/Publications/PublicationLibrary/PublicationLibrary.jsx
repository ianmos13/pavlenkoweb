"use client";
import React from "react";
import styles from "./PublicationLibrary.module.scss";
import ContainerWithSidebar from "@/components/UI/ContainerWithSidebar/ContainerWithSidebar";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

const PublicationLibrary = () => {
  
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("/publication-categories?pagination[pageSize]=9999999");
  const {
    data: publicationsData,
    loading: publicationsLoading,
    error: publicationsError,
  } = useFetch("/publications?populate=*&pagination[pageSize]=9999999");
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const loading = categoriesLoading || publicationsLoading;
  const error = categoriesError || publicationsError;

  const publicationData = React.useMemo(() => {
    if (!categoriesData || !publicationsData) {
      return null;
    }
    const mappedData = {
      categories: categoriesData.map((category, index) => ({
        id: index + 1,
        name: category.category, 
        items: publicationsData
          .filter(
            (publication) =>
              publication.publication_categorie &&
              publication.publication_categorie.id === category.id
          )
          .map((publication) => ({
            id: publication.id,
            header: publication.header
              ? `${API_URL}${publication.header.url}`
              : "/images/default-image.svg",
            body: publication.body,
            category: category.category, 
            link: publication.link,
          })),
      })),
    };

    return mappedData;
  }, [categoriesData, publicationsData]);

  return (
    <div className={styles.libraryContainer}>
      <h2>Библиотека публикаций</h2>
      <Loader loading={loading}>
        <AnimatedComponent>
        <ContainerWithSidebar
          data={publicationData}
          type="PublicationLibrary"
          showAllCategoriesFilters={true}
        />
        </AnimatedComponent>
      </Loader>
    </div>
  );
};

export default PublicationLibrary;
