"use client";
import React from "react";
import styles from "./Documents.module.scss";
import ContainerWithSidebar from "@/components/UI/ContainerWithSidebar/ContainerWithSidebar";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

const Documents = () => {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("/documents-and-report-categories");
  const {
    data: documentsData,
    loading: documentsLoading,
    error: documentsError,
  } = useFetch("/documents-and-reports?populate=*");
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const loading = categoriesLoading || documentsLoading;
  const error = categoriesError || documentsError;

  const documentData = React.useMemo(() => {
    if (!categoriesData || !documentsData) {
      return null;
    }

    
    const mappedData = {
      categories: categoriesData.map((category, index) => ({
        id: index + 1, 
        name: category.category,
        documents: documentsData
          .filter((document) => document.category && document.category.id === category.id)
          .map((document) => ({
            id: document.id,
            name: document.name,
            url: document.url ? `${API_URL}${document.url}` : "",
            file: document.file ? `${API_URL}${document.file.url}` : "",
          })),
      })),
    };

    return mappedData;
  }, [categoriesData, documentsData]);

  return (
    <section className={'container'}>
      <h2 className={styles.header}>Документы и отчеты</h2>
      <AnimatedComponent>
        <div className={styles.documentContainer}>
          <Loader loading={loading}>
            <ContainerWithSidebar
              data={documentData}
              type={"Documents"}
              showAllCategoriesFilters={false}
            />
          </Loader>
        </div>
      </AnimatedComponent>
    </section>
  );
};

export default Documents;
