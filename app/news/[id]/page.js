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
import CoverflowSwiper from "@/components/UI/CoverflowSwiper/CoverflowSwiper";
import TitleWithBackButton from "@/components/UI/TitleWithBackButton/TitleWithBackButton";
import ImageWithDescription from "@/components/UI/ImageWithDescription/ImageWithDescription";
import ArticleInfo from "@/components/News/[id]/ArticleInfo/ArticleInfo";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
import {useEffect} from "react";
import useScrollToTop from "@/services/hook/useScrollToTop";
export default function Page() {
    const { id } = useParams();
    const {
        data: articlesData,
        loading,
        error,
    } = useFetch("/articles?sort=rank:asc&populate=*&pagination[pageSize]=9999999");

    useEffect(() => {
        useScrollToTop()
    }, []);

    const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const articleData = articlesData?.find((article) => article.link === id);

    let listIndex = 0;
    const renderComponent = (component, i) => {
        switch (component.component_name) {
            case "VideoComponent":
                return (
                    <VideoComponent
                        key={`VideoComponent-${i}`}
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
                        key={`ImageWithDescription-${i}`}
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
                    <AnimatedComponent key={`Text-${i}`}>
                        <Text
                            text1={component.texts?.[0] || ""}
                            text2={component.texts?.[1] || ""}
                        />
                    </AnimatedComponent>
                );
            case "List": {
                const listData = articleData?.ListsData?.[listIndex] || {};
                listIndex += 1;
                return (
                    <AnimatedComponent key={`List-${i}`}>
                        <List
                            headerText={listData.headerText || ""}
                            arrayList={listData.arrayList || []}
                        />
                    </AnimatedComponent>
                );
            }
            case "ImageBox":
                const images = articleData?.ImageBoxImages?.map(
                    (image) => `${API_URL}${image.url}`
                ) || [];
                return (
                    <AnimatedComponent key={`ImageBox-${i}`}>
                        <ImageBox
                            textData={component.additional_text}
                            TopLeft={images[0]}
                            TopRight={images[1]}
                            BottomLeft={images[2]}
                            BottomRight={images[3]}
                        />
                    </AnimatedComponent>
                );
            case "CoverflowSwiper":
                return (
                    <AnimatedComponent key={`imageGallery-${i}`}>
                        <CoverflowSwiper
                            key="CoverflowSwiper"
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
                    <AnimatedComponent key={`Subscribe-${i}`}>
                        <Subscribe />
                    </AnimatedComponent>
                );
            case "EducationApplication":
                return (
                    <AnimatedComponent key={`EducationApplication-${i}`}>
                        <EducationApplication />
                    </AnimatedComponent>
                );
            case "TeachingStaff": {
                const categories =
                    articleData?.TeachingStaffCategory?.map((staff) => staff.category) ||
                    [];
                return (
                    <AnimatedComponent key={`TeachingStaff-${i}`}>
                        <TeachingStaff showonly={categories} />
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
                            (component, i) => renderComponent(component, i)
                        )}
                    <Return />
                </>
            )}
        </Loader>
    );
}
