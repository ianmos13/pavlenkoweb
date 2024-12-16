"use client";
import React from "react";
import styles from "./ArticleInfo.module.scss";

const ArticleInfo = ({ date, category }) => {
  return (
    <div className={styles.articleInfo}>
      <div>
        <h4>{date}</h4>
      </div>
      <div>
        <h4>{category}</h4>
      </div>
    </div>
  );
};

export default ArticleInfo;
