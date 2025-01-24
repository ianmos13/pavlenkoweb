"use client";

import React from "react";
import useFetch from "@/services/hook/useFetch";
import Image from "next/image";
import styles from "./RQ.module.scss";
import Link from "next/link";
import TelegramIcon from "@/public/images/icons/telegram-grey.svg";
import VkIcon from "@/public/images/icons/vk-dark.svg";
import DzenIcon from "@/public/images/icons/dzen-dark.svg";
import Loader from "@/components/UI/Loader/Loader";

export default function RQ() {
  const { data, loading, error } = useFetch("/any-questions-link?pagination[pageSize]=9999999");

  if (error) {
    return <p>Ошибка загрузки данных: {error.message}</p>;
  }

  if (!data) return null;

  return (
    <Loader loading={loading}>
      <div className={styles.blocksContainer}>
        <div className={styles.topContainer}>
          <div className={styles.block}>
            <h3>Партнерам</h3>
            <div className={styles.textContainer}>
              <a
                className={styles.linkText}
                href={`mailto:${data.PartnerMail}`}>
                {data.PartnerMail}
              </a>
            </div>
          </div>
          <div className={styles.block}>
            <h3>Резидентам</h3>
            <div className={styles.textContainer}>
              <a
                className={styles.linkText}
                href={`mailto:${data.ResidentMail}`}>
                {data.ResidentMail}
              </a>
            </div>
          </div>
          <div className={styles.block}>
            <h3>СМИ</h3>
            <div className={styles.textContainer}>
              <a className={styles.linkText} href={`mailto:${data.SMIMail}`}>
                {data.SMIMail}
              </a>
            </div>
          </div>
          <div className={styles.block}>
            <h3>Наши соц сети</h3>
            <div className={`${styles.textContainer} ${styles.mediaContainer}`}>
              <div className={styles.iconContainer}>
                {data.tg && (
                  <Link className={styles.link} href={data.tg}>
                    <Image
                      className={styles.image}
                      src={TelegramIcon}
                      alt="Telegram"
                    />
                  </Link>
                )}
              </div>
              <div className={styles.iconContainer}>
                {data.Vk && (
                  <Link className={styles.link} href={data.Vk}>
                    <Image className={styles.image} src={VkIcon} alt="Vk" />
                  </Link>
                )}
              </div>
              <div className={styles.iconContainer}>
                {data.Dzen && (
                  <Link className={styles.link} href={data.Dzen}>
                    <Image className={styles.image} src={DzenIcon} alt="Dzen" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <h3>
            Остались вопросы? По&nbsp;любым вопросам и&nbsp;предложениям можно написать на&nbsp;почту.
          </h3>
          <a className={styles.linkText} href="mailto:info@shkolapavlenko.ru">
            <h3>info@shkolapavlenko.ru</h3>
          </a>
        </div>
      </div>
    </Loader>
  );
}
