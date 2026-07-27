"use client";

import React from "react";
import useFetch from "@/services/hook/useFetch";
import { PAGE_SIZE } from "@/lib/pagination";
import Loader from "@/components/UI/Loader/Loader";
import styles from './ImportantExpenses.module.scss'

const ImportantExpenses = () => {
  const { data: expensesData, loading, error } = useFetch(`/fundraising-important-expenses?sort=rank:asc&populate=*&pagination[pageSize]=${PAGE_SIZE}`);
  const formattedExpensesData = React.useMemo(() => {
    if (!expensesData) return [];

    return expensesData.map((expense) => ({
      id: expense.id,
      description: expense.description,
      moneyAmount: expense.moneyAmount,
    }));
  }, [expensesData]);

  if (error) {
    return <p>Ошибка загрузки данных: {error.message}</p>;
  }

  return (
    <div>
      <Loader loading={loading}>
        <div className={styles.container}>
          {formattedExpensesData.length > 0 ? (
            <>
              <h2>Важные затраты в школе</h2>
              <div className={styles.cardsContainer}>
                {formattedExpensesData.map((expense, idx) => (
                  <div className={styles.block} key={idx}>
                    <h3 className={`secondary`}>{expense.moneyAmount}</h3>
                    <p className={styles.text}>{expense.description}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>Нет данных для отображения затрат.</p>
          )}
        </div>
      </Loader>
    </div>
  );
};

export default ImportantExpenses;
