import React from "react";
import Link from "next/link";
import styles from "./VideoItem.module.scss";

const VideoItem = ({ id, title, authors, category, link }) => {
  const authorList = authors.length > 0 ? authors.join(" | ") : "Автор не указан";

  return (
    <Link href={link || "#"} key={id}> {/* Добавлено значение по умолчанию для link */}
      <div className={styles.videoItem}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.category}>{category}</div>
            <div className={styles.headerImg}>
              <img src="/images/Logos/Logo_Cross_dark.svg" alt="Logo" />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.title}>
            <h5>{title}</h5>
          </div>
          <div className={styles.footer}>
            <div className={styles.authors}>{authorList}</div>
            <div className={styles.icon}>
              <img
                className={styles.desktopArrow}
                src={"/images/icons/right-arrow-bold.svg"}
                alt="Bold Arrow Icon"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoItem;
