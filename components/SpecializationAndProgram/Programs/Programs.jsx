"use client";
import React from "react";
import styles from "./Programs.module.scss";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";
import ContainerWithSidebar from "@/components/UI/ContainerWithSidebar/ContainerWithSidebar";

export default function Programs() {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("/program-categories?sort=rank:asc&pagination[pageSize]=9999999");

  const {
    data: programsData,
    loading: programsLoading,
    error: programsError,
  } = useFetch("/programs?sort=rank:asc&populate=*&pagination[pageSize]=9999999");

  const loading = categoriesLoading || programsLoading;
  const error = categoriesError || programsError;

  const programData = React.useMemo(() => {
    if (!categoriesData || !programsData) return null;

    const mappedData = {
      categories: categoriesData.map((category, index) => ({
        id: index + 1,
        name: category.category,
        questions: programsData
          .filter((program) => program.category && program.category.id === category.id)
          .map((program) => ({
            question: program.name,
            answer: program.description,
          })),
      })),
    };
	console.log(mappedData)
    return mappedData;
	
  }, [categoriesData, programsData]);
 

  return (
    <section className={`${styles.programsContainer} container`}>
      <h2 className={styles.header}>Содержание программ </h2>
      <Loader loading={loading}>
        <ContainerWithSidebar data={programData} type="Question" />
      </Loader>
    </section>
  );
}
