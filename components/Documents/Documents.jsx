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
  } = useFetch("/documents-and-report-categories?sort=rank:asc&pagination[pageSize]=9999999");
  const {
    data: documentsData,
    loading: documentsLoading,
    error: documentsError,
  } = useFetch("/documents-and-reports?sort=rank:asc&populate=*&pagination[pageSize]=9999999");
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
            url: document.url ? `${document.url}` : "",
            file: document.file ? `${API_URL}${document.file[0].url}` : "",
          })),
      })),
    };

    return mappedData;
  }, [categoriesData, documentsData]);

  return (
    <section className={'container'}>
      <h2 className={styles.header}>Документы и отчеты</h2>
        <div className={styles.documentContainer}>
          <Loader loading={loading}>
            <AnimatedComponent>
              <ContainerWithSidebar
                data={documentData}
                type={"Documents"}
                showAllCategoriesFilters={false}
              />
            </AnimatedComponent>
          </Loader>
        </div>
    </section>
  );
};

export default Documents;
