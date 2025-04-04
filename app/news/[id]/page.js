"use client";

import {useParams } from "next/navigation";
import ImageBox from "@/components/News/[id]/ImageBox/ImageBox";
import List from "@/components/News/[id]/List/List";
import Return from "@/components/News/[id]/Return/Return";
import Text from "@/components/News/[id]/Text/Text";
import VideoComponent from "@/components/News/[id]/VideoComponent/VideoComponent";
import EducationApplication from "@/components/UI/EducationApplication/EducationApplication";
import Subscribe from "@/components/UI/Subscribe/Subscribe";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";
import TeachingStaff from "@/components/TeachingStaff/TeachingStaff";
import TitleWithBackButton from "@/components/UI/TitleWithBackButton/TitleWithBackButton";
import BottomLeft from "@/public/images/news_images/bottom-left-filter.webp";
import BottomRight from "@/public/images/news_images/bottom-right-filter.webp";
import TopLeft from "@/public/images/news_images/top-left-filter.webp";
import TopRight from "@/public/images/news_images/top-right-filter.webp";
import ImageWithDescription from "@/components/UI/ImageWithDescription/ImageWithDescription";
import ArticleInfo from "@/components/News/[id]/ArticleInfo/ArticleInfo";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
import {useEffect} from "react";
import useScrollToTop from "@/services/hook/useScrollToTop";
import CustomCoverflowSlider from "@/components/UI/CustomCoverflowSlider/CustomCoverflowSlider";
export default function Page() {
  const { id } = useParams();
  const {
    data: articlesData,
    loading,
    error,
  } = useFetch("/articles?populate=*");

    useEffect(() => {
        useScrollToTop()
    }, []);

  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const articleData = articlesData?.find((article) => article.link === id);

  let listIndex = 0;
  const renderComponent = (component) => {
    switch (component.component_name) {
      case "VideoComponent":
        return (
            <VideoComponent
              key="VideoComponent"
              videoCaption={component.additional_text}
              videoPath={
                  articleData?.VideoComponent
                      ? `${API_URL}${articleData.VideoComponent.url}`
                      : ""
              }
              preview={
                articleData?.VideoComponentPreviw
                  ? `${API_URL}${articleData.VideoComponentPreviw.url}`
                  : ""
              }
            />
        );
      case "ImageWithDescription":
        return (
            <ImageWithDescription
              key="ImageWithDescription"
              imgPath={
                articleData?.ImageWithDescription
                  ? `${API_URL}${articleData.ImageWithDescription.url}`
                  : ""
              }
              textOverlay={component.additional_text}
            />
        );
      case "Text":
        return (
          <AnimatedComponent>
            <Text
              key={`Text-${Math.random()}`}
              text1={component.texts?.[0] || ""}
              text2={component.texts?.[1] || ""}
            />
          </AnimatedComponent>
        );
      case "List": {
        const listData = articleData?.ListsData?.[listIndex] || {};
        listIndex += 1;
        return (
          <AnimatedComponent>
            <List
              key={`List-${listIndex}`}
              headerText={listData.headerText || ""}
              arrayList={listData.arrayList || []}
            />
          </AnimatedComponent>
        );
      }
      case "ImageBox":
        return (
          <AnimatedComponent>
            <ImageBox
              key="ImageBox"
              TopLeft={TopLeft}
              TopRight={TopRight}
              BottomLeft={BottomLeft}
              BottomRight={BottomRight}
            />
          </AnimatedComponent>
        );
      case "CoverflowSwiper":
        return (
          <AnimatedComponent>
            <CustomCoverflowSlider
              type="imageGallery"
              data={
                articleData?.CoverflowSwiperImages?.map(
                  (image) => `${API_URL}${image.url}`
                ) || []
              }
            />
          </AnimatedComponent>
        );
      case "Subscribe":
        return (
          <AnimatedComponent>
            <Subscribe key="Subscribe" />
          </AnimatedComponent>
        );
      case "EducationApplication":
        return (
            <AnimatedComponent>
              <EducationApplication key="EducationApplication" />
            </AnimatedComponent>
        );
      case "TeachingStaff": {
        const categories =
          articleData?.TeachingStaffCategory?.map((staff) => staff.category) ||
          [];
        return (
            <AnimatedComponent>
              <TeachingStaff key="TeachingStaff" showonly={categories} />
            </AnimatedComponent>
        );
      }
      default:
        return null;
    }
  };

  return (
    <Loader loading={loading}>
      {articlesData && articleData && (
        <>
          <TitleWithBackButton title={articleData.title} />
		  <ArticleInfo 
            date={articleData.date} 
            category={articleData.article_categorie.category} 
          />
          {articleData.article_component_order &&
            Object.values(articleData.article_component_order).map(
              (component) => renderComponent(component)
            )}
          <Return />
        </>
      )}
    </Loader>
  );
}
