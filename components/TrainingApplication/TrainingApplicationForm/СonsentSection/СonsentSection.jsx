"use client";
import React from "react";
import styles from "./СonsentSection.module.scss"; 
import ButtonBox from "@/components/UI/Buttons/ButtonBox/ButtonBox";
import LearnMoreButton from "@/components/UI/Buttons/LearnMoreButton/LearnMoreButton";

const ConsentSection = ({ isConsentChecked, setIsConsentChecked, handleSubmit, isLoading }) => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.buttonContainerInner}>
        <label className={styles.consentCheckboxItem}>
          <input
            type="checkbox"
            name="Consent"
            checked={isConsentChecked}
            onChange={(e) => setIsConsentChecked(e.target.checked)}
          />
          <p>
            Согласие на{" "}
            <a href="/personal-data-processing-policy" className={styles.link}>
              обработку персональных данных
            </a>
          </p>
        </label>
      </div>

      <ButtonBox>
        <LearnMoreButton
          text={isLoading ? "Отправка..." : "Отправить заявку"}
          theme={"red"}
          isDisabled={!isConsentChecked || isLoading}
          onClick={handleSubmit}
        />
      </ButtonBox>
    </div>
  );
};

export default ConsentSection;
