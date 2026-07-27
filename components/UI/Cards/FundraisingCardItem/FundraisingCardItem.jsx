import React from "react";
import styles from "./FundraisingCardItem.module.scss";
import Link from "next/link";

const FundraisingCardItem = ({ header, body, category, link, title, date }) => {
  const card = (
    <Card
      header={header}
      body={body}
      category={category}
      link={link}
      title={title}
      date={date}
    />
  );

  if (!link) return card;

  return <Link href={link}>{card}</Link>;
};

export default FundraisingCardItem;

const Card = ({ header, body, category, link, title, date }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.imageContainer}>
          <img src={header} alt={title || "Fundraising image"} />
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardBodyText}>
          {title && <h5 className={styles.title}>{title}</h5>}
          <p className={styles.description}>{body}</p>
        </div>
        <div className={styles.cardFooter}>
          <div
            className={`${styles.categoryContainer} ${
              date ? styles.columnLayout : ""
            }`}
          >
            {date && <p>{date}</p>}
            <p>{category}</p>
          </div>
          {link && (
            <>
              <img
                className={`${styles.arrowIcon} ${styles.desktopArrow}`}
                src={"/images/icons/right-arrow-bold.svg"}
                alt="Bold Arrow Icon"
              />
              <img
                className={`${styles.arrowIcon} ${styles.mobileArrow}`}
                src={"/images/icons/right-arrow-normal.svg"}
                alt="Normal Arrow Icon"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
