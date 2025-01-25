"use client";
import React from "react";
import styles from "./VideoLibrary.module.scss";
import ContainerWithSidebar from "@/components/UI/ContainerWithSidebar/ContainerWithSidebar";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

const VideoLibrary = () => {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("/video-categories?pagination[pageSize]=9999999");
  const {
    data: videosData,
    loading: videosLoading,
    error: videosError,
  } = useFetch("/videos?populate=*&pagination[pageSize]=9999999");

  const loading = categoriesLoading || videosLoading;
  const error = categoriesError || videosError;

  const videoData = React.useMemo(() => {
    if (!categoriesData || !videosData) {
      return null;
    }
    const mappedData = {
      categories: categoriesData.map((category, index) => ({
        id: index + 1,
        name: category.category,
        videos: videosData
          .filter(
            (video) =>
              video.video_category && video.video_category.id === category.id
          )
          .map((video) => ({
            id: video.id,
            title: video.title,
            category: category.category,
            authors: video.authors || [], 
            link: video.youtube_link,
          })),
      })),
    };

    return mappedData;
  }, [categoriesData, videosData]);

  return (
    <div className={styles.videoContainer}>
      <h2>Библиотека видео</h2>
      <Loader loading={loading}>
        <AnimatedComponent>
          <ContainerWithSidebar
            data={videoData}
            type={"VideoLibrary"}
            showAllCategoriesFilters={true}
          />
        </AnimatedComponent>
      </Loader>
    </div>
  );
};

export default VideoLibrary;
