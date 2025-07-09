"use client";
import { useEffect, useState } from "react";
import containerStyles from "@/components/UI/ContainerWithSidebar/ContainerWithSidebar.module.scss";
import SidebarCategoriesSchoolTeam from "./SidebarCategoriesSchoolTeam";
import SchoolTeamLibrary from "@/components/UI/ContainerWithSidebar/SchoolTeamLibrary/SchoolTeamLibrary";

const ContainerWithSidebarSchoolTeam = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState(null);


  const categories = data?.categories || [];


  const sidebarCategories = categories.map((cat) => {
    if (cat.name === "Наставники в штате" && cat.subcategories) {
      return {
        id: cat.id,
        name: cat.name,
        subcategories: cat.subcategories.map((sub) => ({
          id: sub.id,
          name: sub.name,
        })),
      };
    }
    return {
      id: cat.id,
      name: cat.name,
    };
  });


  const handleCategoryChange = (id) => {
    setActiveCategory(id);
  };


  const getStafs = () => {
    if (!categories.length) return [];

    for (const cat of categories) {
      if (cat.id === activeCategory) {
        return cat.stufs || [];
      }
      if (cat.subcategories) {
        const sub = cat.subcategories.find((s) => s.id === activeCategory);
        if (sub) {
          return sub.stufs || [];
        }
      }
    }
    return [];
  };

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0].id);
    }
  }, [data]);

 
  useEffect(() => {
    setActiveCategory(null);
  }, [categories.length]);

  return (
    <div className={containerStyles.ContainerInner}>
      <SidebarCategoriesSchoolTeam
        categories={sidebarCategories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div className={containerStyles.content}>
        <SchoolTeamLibrary staf={getStafs()} />
      </div>
    </div>
  );
};

export default ContainerWithSidebarSchoolTeam;
