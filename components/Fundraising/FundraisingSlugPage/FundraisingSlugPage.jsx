"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import FundraisingItem from "@/components/Fundraising/FundraisingItem/FundraisingItem";
import FundraisingItemSkeleton from "@/components/Fundraising/FundraisingSlugPage/FundraisingItemSkeleton";
import NotFound from "@/components/404page/NotFound";
import { fetchData } from "@/lib/api";
import { PAGE_SIZE } from "@/lib/pagination";
import {
  isFundraisingItemPublished,
  mapFundraisingItemFromStrapi,
} from "@/lib/fundraising/mapFundraisingItem";

const FundraisingSlugPage = () => {
  const { slug } = useParams();
  const [fundraisingItem, setFundraisingItem] = useState(null);
  const [goalsData, setGoalsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const formattedGoalsData = useMemo(() => {
    return goalsData.map((goal) => ({
      slug: goal.slug,
      image: `${API_URL}${goal.image?.url ?? ""}`,
      name: goal.name,
      primary: goal.primary,
    }));
  }, [API_URL, goalsData]);

  const fetchFundraisingItem = useCallback(async () => {
    if (!slug) return null;

    const fundraisingPath =
      `/fundraising-items?filters[slug][$eq]=${encodeURIComponent(slug)}` +
      `&publicationState=live&pagination[pageSize]=1&populate=*`;

    const fundraisingResponse = await fetchData(fundraisingPath);
    const rawItem = Array.isArray(fundraisingResponse.data)
      ? fundraisingResponse.data[0]
      : null;

    const isAvailable =
      rawItem &&
      !fundraisingResponse.error &&
      isFundraisingItemPublished(rawItem);

    if (!isAvailable) return null;

    return mapFundraisingItemFromStrapi(rawItem);
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    let isCancelled = false;

    const loadFundraisingPage = async () => {
      setLoading(true);
      setNotFound(false);
      setFundraisingItem(null);

      const goalsPath =
        `/fundraising-goals?sort=rank:asc&populate=*&pagination[pageSize]=${PAGE_SIZE}`;

      const [item, goalsResponse] = await Promise.all([
        fetchFundraisingItem(),
        fetchData(goalsPath),
      ]);

      if (isCancelled) return;

      if (!item) {
        setNotFound(true);
        setFundraisingItem(null);
      } else {
        setFundraisingItem(item);
        setNotFound(false);
      }

      setGoalsData(Array.isArray(goalsResponse.data) ? goalsResponse.data : []);
      setLoading(false);
    };

    loadFundraisingPage();

    return () => {
      isCancelled = true;
    };
  }, [slug, fetchFundraisingItem]);

  const handlePaymentSuccess = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const item = await fetchFundraisingItem();
    if (item) {
      setFundraisingItem(item);
    }
  }, [fetchFundraisingItem]);

  if (loading) {
    return <FundraisingItemSkeleton />;
  }

  if (notFound || !fundraisingItem) {
    return <NotFound />;
  }

  return (
    <FundraisingItem
      mode="published"
      data={fundraisingItem}
      goalsData={formattedGoalsData}
      onPaymentSuccess={handlePaymentSuccess}
    />
  );
};

export default FundraisingSlugPage;
