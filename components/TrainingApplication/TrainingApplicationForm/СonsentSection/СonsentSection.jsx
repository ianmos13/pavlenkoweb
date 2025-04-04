"use client";
import React from "react";
import styles from "./СonsentSection.module.scss";
import ButtonBox from "@/components/UI/Buttons/ButtonBox/ButtonBox";
import LearnMoreButton from "@/components/UI/Buttons/LearnMoreButton/LearnMoreButton";

const ConsentSection = ({
  isConsentChecked,
  setIsConsentChecked,
  handleSubmit,
  isLoading,
  isFormValid,
  errors,
  setErrors
}) => {
  const handleCheckboxChange = (e) => {
    setIsConsentChecked(e.target.checked);

 
    setErrors((prev) => ({ ...prev, consent: "" }));
  };

  return (
    <div className={styles.buttonContainer}>
      <div className={styles.buttonContainerInner}>
        <label className={styles.consentCheckboxItem} id="Consent">
          <input
            type="checkbox"
            name="Consent"
            checked={isConsentChecked}
            onChange={handleCheckboxChange}
          />
          <p>
            Согласие на{" "}
            <a href="/personal-data-processing-policy" className={styles.link}>
              обработку персональных данных
            </a>
          </p>
        </label>
        {errors?.consent && <p className={styles.error}>{errors.consent}</p>}
      </div>

      <ButtonBox>
        <LearnMoreButton
          text={isLoading ? "Отправка..." : "Отправить заявку"}
          theme={isFormValid && !isLoading ? "red" : "disabled"}
          isDisabled={!isFormValid || isLoading}
          onClick={handleSubmit}
        />
      </ButtonBox>
    </div>
  );
};

export default ConsentSection;