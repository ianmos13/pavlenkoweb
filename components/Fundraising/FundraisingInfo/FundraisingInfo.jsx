"use client";

import React from "react";
import styles from './FundraisingInfo.module.scss'

const FundraisingInfo = ({ data }) => {
  if(!data) return null;

  const collectedValue = Number(data.collectedValue) || 0;

  const formatMoney = (value) => `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;

  const getPeopleWord = (count) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return "человек";
    if (lastDigit === 1) return "человек";
    if (lastDigit >= 2 && lastDigit <= 4) return "человека";
    return "человек";
  };

  const getHeaderText = () => {
    if (data.peopleCount === 0) return "Станьте первым и поддержите сбор";
    if (data.peopleCount === 1) return "Уже поддержал 1 человек";
    return `Уже поддержало ${data.peopleCount} ${getPeopleWord(data.peopleCount)}`;
  };

  const getResultMeta = (value) => {
    if (data.fixedValue !== 0) {
      const percent = Math.max((value / data.fixedValue) * 100, 3);
      return {
        goalValue: formatMoney(data.fixedValue),
        comment: "",
        progressPercent: Math.min(percent, 100),
      };
    }
    if (value >= 500000) {
      return {
        goalValue: "∞",
        comment: "",
        progressPercent: 100,
      };
    }

    if (value >= 80000) {
      const goal = 500000;
      const remain = Math.max(goal - value, 0);
      return {
        goalValue: formatMoney(goal),
        comment: `осталось ${formatMoney(remain)} до хирургического интенсива для группы резидентов`,
        progressPercent: Math.min((value / goal) * 100, 100),
      };
    }

    if (value >= 50000) {
      const goal = 80000;
      const remain = Math.max(goal - value, 0);
      return {
        goalValue: formatMoney(goal),
        comment: `осталось ${formatMoney(remain)} до стажировки одного резидента в пределах России`,
        progressPercent: Math.min((value / goal) * 100, 100),
      };
    }

    if (value >= 30000) {
      const goal = 50000;
      const remain = Math.max(goal - value, 0);
      return {
        goalValue: formatMoney(goal),
        comment: `осталось ${formatMoney(remain)} до ежемесячной стипендии одного резидента`,
        progressPercent: Math.min((value / goal) * 100, 100),
      };
    }

    const goal = 30000;
    const remain = Math.max(goal - value, 0);
    return {
      goalValue: formatMoney(goal),
      comment: `осталось ${formatMoney(remain)} до компенсации аренды квартиры для иногородних резидентов`,
      progressPercent: Math.min((value / goal) * 100, 100),
    };
  };

  const resultMeta = getResultMeta(collectedValue);

  return (
    <section className={`${styles.block} container`}>
      <div className={styles.container}>
        <h2>Информация о сборе</h2>
        <div className={styles.textContainer}>
          <div className={styles.headerInfo}>
            <div className={styles.organizerContainer}>
              <div className={styles.label}>
                Организатор сбора
              </div>
              <div className={styles.value}>
                { data.organizerName }
              </div>
            </div>
            <div className={styles.endContainer}>
              <div className={styles.label}>
                Завершение сбора
              </div>
              <div className={styles.value}>
                { data.fundraisingEnd }
              </div>
            </div>
          </div>
          <p className={styles.text}>
            { data.fundraisingDescription }
          </p>
          <div className={styles.footerInfo}>
            <div className={styles.organizerContainer}>
              <div className={styles.label}>
                Завершение сбора
              </div>
              <div className={styles.value}>
                { data.fundraisingEnd }
              </div>
            </div>
          </div>
        </div>

        <div className={styles.fundraisingInfo}>
          <div className={styles.fundraisingInfoHeader}>
            <h2>
              {getHeaderText()}
              { data.peopleCount === 0 && (
                <>
                  {" "}
                  <svg className={styles.heart} />
                  {" "}
                  <svg className={styles.heart} />
                  {" "}
                  <svg className={styles.heart} />
                </>
              )}
            </h2>
          </div>
          <div className={styles.fundraisingInfoBody}>
            <div className={styles.resultInfo}>
              <div className={styles.item}>
                <span className={styles.label}>Собрано</span>
                <span className={styles.value}>{formatMoney(collectedValue)}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>Цель</span>
                <span className={styles.value}>{resultMeta.goalValue}</span>
              </div>
            </div>
            <div className={styles.resultLine}>
              <div
                className={styles.progressLine}
                style={{ width: `${resultMeta.progressPercent * 1.5}%` }}
              />
            </div>
            {resultMeta.progressPercent !== 100 && (
              <div className={styles.resultComment}>
                {resultMeta.comment}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundraisingInfo;