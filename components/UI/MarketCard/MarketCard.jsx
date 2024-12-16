// MarketCard.js
import React from "react";
import styles from "./MarketCard.module.scss";

const MarketCard = (props) => {
  const { title, img, price, discountPrice, description, link, inSwiper } = props
  return (
    <a className={`${styles.card} ${inSwiper ? styles.swiperCard : ''}`} href={`market/${link}`}>
      <div className={styles.imagePlaceholder}>
        <img src={img} alt={title} />
      </div>
      <div className={styles.bottom}>
        <div className={styles.info}>
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
        <div className={styles.footer}>
          <div className={styles.price}>
            <h3>{price}</h3>
          </div>
          <div className={styles.discountPrice}>
            <p>{discountPrice}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default MarketCard;
