"use client";
import React from "react";
import styles from "./NewsLibrary.module.scss";
import ContainerWithSidebar from "@/components/UI/ContainerWithSidebar/ContainerWithSidebar";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";

const NewsLibrary = () => {
 
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("/article-categories");
  const {
    data: articlesData,
    loading: articlesLoading,
    error: articlesError,
  } = useFetch("/articles?populate=*");
  
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const loading = categoriesLoading || articlesLoading;
  const error = categoriesError || articlesError;

  const newsData = React.useMemo(() => {
    if (!categoriesData || !articlesData) {
      return null;
    }
    const mappedData = {
      categories: categoriesData.map((category, index) => ({
        id: index + 1, 
        name: category.category,
        articles: articlesData
          .filter(
            (article) =>
              article.article_categorie &&
              article.article_categorie.id === category.id
          )
          .map((article) => ({
            id: article.id,
            header: article.header
              ? `${API_URL}${article.header.url}`
              : "/images/news_images/default-image.svg",
            title: article.title,
            body: article.body,
            category: category.categorie,
            date: new Date(article.date).toLocaleDateString(),
            link: `/news/${article.link}`,
          })),
      })),
    };

    console.log("Mapped news data:", mappedData);
    return mappedData;
  }, [categoriesData, articlesData]);

  return (
    <div className={styles.newsContainer}>
      <h2>Новости школы</h2>
      <Loader loading={loading}>
        <ContainerWithSidebar
          data={newsData}
          type={"NewsLibrary"}
          showAllCategoriesFilters={true}
        />
      </Loader>
    </div>
  );
};

export default NewsLibrary;
