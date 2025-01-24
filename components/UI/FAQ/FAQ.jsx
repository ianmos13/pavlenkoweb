"use client";
import React from "react";
import ContainerWithSidebar from "@/components/UI/ContainerWithSidebar/ContainerWithSidebar";
import styles from "./FAQ.module.scss";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";
import {parseAnswerContent} from "@/services/parseAnswerContent";

const FAQ = () => {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("/faq-categories?pagination[pageSize]=9999999");

  const {
    data: faqsData,
    loading: faqsLoading,
    error: faqsError,
  } = useFetch("/faqs?populate=*&pagination[pageSize]=9999999");

  const loading = categoriesLoading || faqsLoading;
  const error = categoriesError || faqsError;

  const faqData = React.useMemo(() => {
    if (!categoriesData || !faqsData) return null;

    const mappedData = {
      categories: categoriesData.map((category, index) => ({
        id: index + 1,
        name: category.category,
        questions: faqsData
          .filter((faq) => faq.category && faq.category.id === category.id)
          .map((faq) => ({
            question: faq.question,
            answer: parseAnswerContent(faq.answer),
          })),
      })),
    };

    return mappedData;
  }, [categoriesData, faqsData]);
  return (
    <section className={`${styles.faqContainer} container`}>
      <h2>Часто задаваемые вопросы</h2>
      <Loader loading={loading}>
        <ContainerWithSidebar data={faqData} type="Question" />
      </Loader>
    </section>
  );
};


export default FAQ;
