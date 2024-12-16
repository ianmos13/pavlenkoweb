import React from "react";
import styles from "./ServiceUnavailable.module.scss";

const ServiceUnavailable = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Сервис временно недоступен</h1>
      <div className={styles.message}>
        <h3>
          Обновите страницу немного позднее или<br></br> обратитесь по телефону{" "}
          <a href="tel:+79032342525">+7 (903) 234 25 25</a>
        </h3>
      </div>
    </div>
  );
};

export default ServiceUnavailable;
