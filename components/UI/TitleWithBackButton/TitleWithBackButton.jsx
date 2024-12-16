"use client";
import { useRouter } from "next/navigation";
import styles from "./TitleWithBackButton.module.scss";

const TitleWithBackButton = ({ title }) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.baсkButton} onClick={() => router.back()}>
        <img src="/images/icons/back-icon.svg" />
        <div>
          <p>Назад</p>
        </div>
      </div>
      <div>
        <h1>{title}</h1>
      </div>
    </div>
  );
};
export default TitleWithBackButton;
