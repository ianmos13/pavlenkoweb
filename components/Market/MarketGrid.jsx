"use client";
import React, { useState } from "react";
import styles from "./MarketGrid.module.scss";
import Pagination from "@/components/UI/Pagination/Pagination";
import MarketCard from "../UI/MarketCard/MarketCard";
import useFetchProducts from "@/services/hook/useFetchProducts";
import Loader from "@/components/UI/Loader/Loader";

const itemsPerPage = 9;

const MarketGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { products: items, loading, error } = useFetchProducts();

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.marketContainer}>
      <h1>Маркет</h1>
      <h3>Пока мерч доступен по предзаказу, по почте mail@mail.ru</h3>
      <Loader loading={loading}>
        <div className={styles.grid}>
          {currentItems.map((item) => (
            <MarketCard
              key={item.id}
              title={item.title}
              img={item.img}
              price={item.price}
              discontPrice={item.discontPrice}
              description={item.description}
              link={item.link}
            />
          ))}
        </div>
      </Loader>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MarketGrid;
