"use client";
import styles from "./LearnMoreButton.module.scss";
import { Squircle } from "corner-smoothing";

const LearnMoreButton = ({ text, isDisabled, onClick, theme }) => {
  return (
    <div className={`${styles.container} ${styles[`${theme}Container`]} ${isDisabled ? styles.disabledContainer : ''}`}>
      <Squircle cornerRadius={16} cornerSmoothing={0.9} borderWidth={1}>
        <button
          className={styles.buttonContainer}
          onClick={onClick}
          disabled={false} // всегда кликабельная
          type="button"
        >
          <div className={styles.buttonText}>{text}</div>
          <div className={styles.iconContainer}>
            <svg className={styles.icon} />
          </div>
        </button>
      </Squircle>
    </div>
  );
};

export default LearnMoreButton;
