"use client";

import { useRouter } from "next/navigation";
import styles from "./VideoAtlasHeader.module.scss";
import LearnMoreButton from "@/components/UI/Buttons/LearnMoreButton/LearnMoreButton";

const VideoAtlasHeader = () => {
  const router = useRouter();
  const buttonUrl = "https://www.youtube.com/";

  const onSubmit = () => {
    window.open(buttonUrl, "_blank");
  };
  return (
    <section className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.textSection}>
          <h1>Видеоатлас для хирургов</h1>
          <h5>
            Цифровое образовательное пособие Школы Павленко помогает собрать
            рекомендации по стандартам безопасной хирургии, предложенные
            экспертным сообществом в рамках первой очной конференции
            4SurgeonsClub.
          </h5>
          <h5>
            Видеоатлас Школы Павленко выложен в открытый доступ и содержит этапы
            операций в хорошем качестве, параллельный комментарий эксперта и
            тайм-коды для быстрой навигации.
          </h5>
          <div className={styles.buttonContainer}>
            <LearnMoreButton
              theme={"youtube"}
              text={"Подписаться на канал"}
              onClick={onSubmit}
            />
          </div>
        </div>
        <div className={styles.imageSection}>
          <img
            src="/images/video-atlas-header.webp"
            alt="Surgery Training"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default VideoAtlasHeader;
