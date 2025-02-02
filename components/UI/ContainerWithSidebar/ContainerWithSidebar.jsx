"use client";
import { useEffect, useState } from "react";
import styles from "./ContainerWithSidebar.module.scss";
import NewsLibrary from "@/components/UI/ContainerWithSidebar/NewsLibrary/NewsLibrary";
import QuestionsList from "@/components/UI/ContainerWithSidebar/QuestionsList/QuestionsList";
import SidebarCategories from "@/components/UI/ContainerWithSidebar/SidebarCategories/SidebarCategories";
import PublicationLibrary from "./PublicationLibrary/PublicationLibrary";
import VideoLibrary from "./VideoLibrary/VideoLibrary";
import SchoolTeamLibrary from "./SchoolTeamLibrary/SchoolTeamLibrary";
import DocumentsLibrary from "./DocumentsLibrary/DocumentsLibrary";
import TeachingStaff from "./TeachingStaff/TeachingStaff";
import Programs from "@/components/SpecializationAndProgram/Programs/Programs";

const ContainerWithSidebar = ({ data, type, showAllCategoriesFilters }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
  };

  const getCategoryItems = (key) => {
    return activeCategory === null
      ? data.categories.flatMap((category) => category[key] || [])
      : data.categories.find((category) => category.id === activeCategory)?.[
          key
        ] || [];
  };

  useEffect(() => {
    if (data && data.categories.length > 0) {
      setActiveCategory(
        showAllCategoriesFilters ? null : data.categories[0].id
      );
    }
  }, [data, showAllCategoriesFilters]);

  const contentMap = {
    NewsLibrary: <NewsLibrary news={getCategoryItems("articles")} />,
    PublicationLibrary: (
      <PublicationLibrary publications={getCategoryItems("items")} />
    ),
    VideoLibrary: <VideoLibrary video={getCategoryItems("videos")} />,
    SchoolTeam: <SchoolTeamLibrary staf={getCategoryItems("stufs")} />,
    TeachingStaff: <TeachingStaff staf={getCategoryItems("stufs")} />,
    Documents: <DocumentsLibrary documents={getCategoryItems("documents")} />,
    Question: (
      <QuestionsList
        questions={getCategoryItems("questions")}
        separator={true}
      />
    ),
    Program: (
      <QuestionsList
        questions={getCategoryItems("programs")}
        separator={true}
      />
    ),
  };

  return (
    <div className={styles.ContainerInner}>
      <SidebarCategories
        categories={data.categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        showAllCategoriesFilters={showAllCategoriesFilters}
        allCategoriesLabel={
          type === "NewsLibrary"
            ? "Все новости"
            : type === "PublicationLibrary"
            ? "Все публикации"
            : type === "VideoLibrary"
            ? "Все публикации"
            : type === "SchoolTeam"
            ? "Вся команда"
            : type === "TeachingStaff"
            ? "Все наставники"
            : type === "Documents"
            ? "Все документы"
            : type === "Question"
            ? "Все вопросы"
            : type === "Program"
            ? "Все программы"
            : "Все категории"
        }
      />
      <div className={styles.content}>{contentMap[type] || null}</div>
    </div>
  );
};

export default ContainerWithSidebar;
