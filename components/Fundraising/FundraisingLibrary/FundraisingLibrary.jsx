"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./FundraisingLibrary.module.scss";
import FundraisingCardItem from "@/components/UI/Cards/FundraisingCardItem/FundraisingCardItem";
import Pagination from "@/components/UI/Pagination/Pagination";
import FundraisingLibrarySkeleton from "@/components/Fundraising/FundraisingLibrary/FundraisingLibrarySkeleton";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
import { fetchData } from "@/lib/api";
import { PAGE_SIZE } from "@/lib/pagination";
import {
  isFundraisingItemPublished,
  mapFundraisingCardFromStrapi,
} from "@/lib/fundraising/mapFundraisingItem";

const ITEMS_PER_PAGE = 9;

const FundraisingLibrary = () => {
  const [fundraisingItems, setFundraisingItems] = useState([]);
  const [goalsData, setGoalsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const contentRef = useRef(null);

  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const goalsBySlug = useMemo(() => {
    return goalsData.reduce((acc, goal) => {
      acc[goal.slug] = goal;
      return acc;
    }, {});
  }, [goalsData]);

  const cards = useMemo(() => {
    return fundraisingItems
      .filter(isFundraisingItemPublished)
      .map((item) => mapFundraisingCardFromStrapi(item, goalsBySlug, API_URL));
  }, [API_URL, fundraisingItems, goalsBySlug]);

  useEffect(() => {
    let isCancelled = false;

    const loadFundraisingList = async () => {
      setLoading(true);
      setError("");

      const fundraisingPath =
        `/fundraising-items?filters[completeModeration][$eq]=true` +
        `&sort=createdAt:desc&populate=*&pagination[pageSize]=${PAGE_SIZE}`;

      const goalsPath =
        `/fundraising-goals?sort=rank:asc&populate=*&pagination[pageSize]=${PAGE_SIZE}`;

      const [fundraisingResponse, goalsResponse] = await Promise.all([
        fetchData(fundraisingPath),
        fetchData(goalsPath),
      ]);

      if (isCancelled) return;

      if (fundraisingResponse.error || goalsResponse.error) {
        setError("Не удалось загрузить список сборов.");
        setFundraisingItems([]);
        setGoalsData([]);
      } else {
        setFundraisingItems(
          Array.isArray(fundraisingResponse.data) ? fundraisingResponse.data : []
        );
        setGoalsData(Array.isArray(goalsResponse.data) ? goalsResponse.data : []);
      }

      setLoading(false);
    };

    loadFundraisingList();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [cards.length]);

  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = cards.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        window.scrollBy(0, -20);
      }, 500);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  if (loading) {
    return <FundraisingLibrarySkeleton />;
  }

  return (
    <section className={styles.container} ref={contentRef}>
      {error && <p className={styles.error}>{error}</p>}

      {!error && cards.length === 0 && (
        <p className={styles.empty}>Нет сборов для отображения.</p>
      )}

      {!error && cards.length > 0 && (
        <>
          <div className={styles.grid}>
            {currentItems.map((item) => (
              <FundraisingCardItem
                key={item.id}
                header={item.header}
                title={item.title}
                body={item.body}
                category={item.category}
                date={item.date}
                link={item.link}
              />
            ))}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
};

export default FundraisingLibrary;
