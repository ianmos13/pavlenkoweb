"use client";
import React from "react";
import styles from "./ConsentSection.module.scss";
import ButtonBox from "@/components/UI/Buttons/ButtonBox/ButtonBox";
import SubscribeButton from "@/components/UI/Buttons/SubscribeButton/SubscribeButton";
import PreviewButton from "@/components/UI/Buttons/PreviewButton/PreviewButton";

const ConsentSection = (props) => {
  const {
    isConsentOneChecked,
    setIsConsentOneChecked,
    isConsentTwoChecked,
    setIsConsentTwoChecked,
    handleSubmit,
    onPreview,
    isLoading
  } = props

  return (
    <div className={styles.mainContainer}>
      <label className={styles.consentCheckboxItem}>
        <input
          type="checkbox"
          name="Consent"
          checked={isConsentOneChecked}
          onChange={(e) => setIsConsentOneChecked(e.target.checked)}
        />
        <span>
          Принимаю условия{" "}
          <a href="/personal-data-processing-policy" className={styles.link}>
            пользовательского соглашения
          </a>
        </span>
      </label>

      <label className={styles.consentCheckboxItem}>
        <input
          type="checkbox"
          name="Consent"
          checked={isConsentTwoChecked}
          onChange={(e) => setIsConsentTwoChecked(e.target.checked)}
        />
        <span>
          Подтверждаю согласие на{" "}
          <a href="/personal-data-processing-policy" className={styles.link}>
            обработку персональных данных
          </a>
        </span>
      </label>

      <div className={styles.buttonsContainer}>
        <ButtonBox className={styles.buttonContainer}>
          <PreviewButton
            text={"Предпросмотр"}
            isDisabled={isLoading}
            onClick={onPreview}
          />
        </ButtonBox>
        <ButtonBox className={styles.buttonContainer}>
          <SubscribeButton
            text={isLoading ? "Отправка..." : "Создать сбор"}
            theme={"join"}
            isDisabled={!isConsentOneChecked || !isConsentTwoChecked  || isLoading}
            onClick={handleSubmit}
          />
        </ButtonBox>
      </div>
    </div>
  );
};

export default ConsentSection;