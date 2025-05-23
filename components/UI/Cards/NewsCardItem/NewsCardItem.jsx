import React from "react";
import styles from "./NewsCardItem.module.scss";
import Image from "next/image";
import Link from "next/link";
import Camera from "@/public/images/icons/news-camera.svg";
import Podkast from "@/public/images/icons/podcast.svg";
import Article from "@/public/images/icons/article.svg";

const NewsCardItem = ({ header, body, category, link, title, date, target }) => {
  return (
      <>
        { link ? (
            <Link href={link} target={target ? target : undefined}>
              <Card
                  header={header}
                  body={body}
                  category={category}
                  link={link}
                  title={title}
                  date={date}
              />
            </Link>
        ) : (
            <Card
                header={header}
                body={body}
                category={category}
                link={link}
                title={title}
                date={date}
            />
        )}
      </>
  );
};

export default NewsCardItem;

const Card = ({ header, body, category, link, title, date }) => {
  const renderCategoryIcon = (category) => {
    switch (category) {
      case "Видео":
        return <Image src={Camera} alt="Camera Icon" />;
      case "Подкаст":
        return <Image src={Podkast} alt="Podcast Icon" />;
      case "Статьи":
        return <Image src={Article} alt="Article Icon" />;
      default:
        return null;
    }
  };

  return (
      <div className={styles.card} >
        <div className={styles.cardHeader}>
          <div className={styles.imageContainer}>
            <img src={header} alt="Header Image" />
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
                }`}>
              {renderCategoryIcon(category)}
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
