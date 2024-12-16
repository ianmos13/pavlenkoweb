import React from "react";
import styles from "./SingleMarketPage.module.scss";
import TitleWithBackButton from "@/components/UI/TitleWithBackButton/TitleWithBackButton";
import ImageGallerySlider from "@/components/UI/ImageGalerySlider/ImageGallerySlider";
import Recomendation from "../Recomendation/Recomendation";
const SingleMarketPage = ({
  title,
  article,
  price,
  discontPrice,
  description,
  images,
  wbUrl,
  ozonUrl,
}) => {
  return (
    <>
      <TitleWithBackButton title={title} />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageGallery}>
            <ImageGallerySlider images={images} title={title} />
          </div>
          <div className={styles.details}>
            <p className={styles.articleContainer}>
              <span className={styles.article}> Артикул</span> {article}
            </p>
            <div className={styles.description}>
              <h5>{description}</h5>
            </div>
            <div className={styles.priceContainer}>
              <div className={styles.priceContainerInner}>
                <div className={styles.price}>
                  <h3>{price}</h3>
                </div>
                <div className={styles.discontPrice}>
                  <p>{discontPrice}</p>
                </div>
              </div>
              <p>
                Пока мерч доступен по предзаказу, по почте{" "}
                <a className={styles.mail} href="mailto:mail@mail.ru">
                  mail@mail.ru
                </a>
              </p>
              <div className={styles.buttons}>
                {wbUrl && (
                  <a href={wbUrl} className={styles.wbButton}>
                    <img src="/images/icons/Wb_link.svg" />
                  </a>
                )}
                {ozonUrl && (
                  <a href={ozonUrl} className={styles.ozonButton}>
                    <img src="/images/icons/Ozon_link.svg" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <Recomendation />
      </div>
    </>
  );
};

export default SingleMarketPage;
