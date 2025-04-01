"use client";

import React from "react";
import RunningLine from "@/components/UI/RunningLines/RunningLine/RunningLine";
import styles from "./Header.module.scss";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";
import declineWord from "decline-word";

const Header = () => {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch(
    "/program-categories?sort=rank:asc&pagination[pageSize]=9999999"
  );

  const categories = React.useMemo(() => {
    if (!categoriesData) return null;

    const mappedData = categoriesData.map((category) => category.category);
    return mappedData;
  }, [categoriesData]);

  function headerName(number) {
    return `${number} ${declineWord(number, "специализаци", "я", "и", "й")}`;
  }

  return (
    <>
      <div className={styles.headerContainer}>
        <Loader loading={categoriesLoading}>
          <div className={styles.headerContainerInner}>
            <div className={styles.textSection}>
              <h1>
                В школе проходят наборы на
                <span className={styles.focusText}>
                  {" "}
                  {headerName(categories.length)}
                </span>
              </h1>
            </div>
            <div className={styles.imageSection}>
              <img
                src="/images/aboutUS-header.webp"
                alt="Заголовок"
                className={styles.image}
              />
            </div>
          </div>
        </Loader>
      </div>
      <div className={styles.runningLine}>
        <div className={styles.lines}>
          <RunningLine data={categories} />
        </div>
      </div>
    </>
  );
};

export default Header;
