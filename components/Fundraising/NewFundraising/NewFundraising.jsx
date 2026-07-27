"use client";

import { useState, useMemo } from "react";
import Banner from "@/components/Fundraising/Banner/Banner";
import ImportantExpenses from "@/components/Fundraising/ImportantExpenses/ImportantExpenses";
import InstructionForUse from "@/components/Fundraising/InstructionForUse/InstructionForUse";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
import InfoForm from "@/components/Fundraising/InfoForm/InfoForm";
import FundraisingItem from "@/components/Fundraising/FundraisingItem/FundraisingItem";
import useFetch from "@/services/hook/useFetch";
import {PAGE_SIZE} from "@/lib/pagination";

const bannerData = {
  headerText: "Друзья хирургов",
  body: "объединяйтесь, чтобы поддержать Школу Павленко",
  buttonLink: "#fundraising-info-form",
  buttonText: "Создать сбор",
  primary: true
};

export default function NewFundraising() {
  const [mode, setMode] = useState("edit");
  const [previewData, setPreviewData] = useState(null);

  const { data: goalsData, goalsLoading, goalsError } = useFetch(`/fundraising-goals?sort=rank:asc&populate=*&pagination[pageSize]=${PAGE_SIZE}`);
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const formattedGoalsData = useMemo(() => {
    if (!goalsData) return [];

    return goalsData.map((goal) => ({
      slug: goal.slug,
      image: `${API_URL}${goal.image?.url}`,
      name: goal.name,
      primary: goal.primary,
    }));
  }, [API_URL, goalsData]);

  const handlePreview = (data) => {
    setPreviewData({ ...data, peopleCount: 0, collectedValue: 0 });
    setMode("preview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToEdit = () => {
    setMode("edit");
    requestAnimationFrame(() => {
      const formElement = document.getElementById("fundraising-info-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return (
    <>
      <div hidden={mode === "preview"}>
        <Banner
          id='newFundraising'
          data={bannerData}
        />
        <ImportantExpenses />
        <InstructionForUse />
        <InfoForm
          onPreview={handlePreview}
          goalsData={formattedGoalsData}
        />
      </div>

      {mode === "preview" && previewData && (
        <FundraisingItem
          mode={mode}
          data={previewData}
          goalsData={formattedGoalsData}
          onBack={handleBackToEdit}
        />
      )}
    </>
  );
}
