import styles from "./TrainingApplicationHeader.module.scss";

const TrainingApplicationHeader = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContainerInner}>
        <div className={styles.textSection}>
          <h1>
            Анкета <span className={styles.focusText}>на&nbsp;обучение </span>
            в&nbsp;Школе Павленко
          </h1>
        </div>
        <div className={styles.imageSection}>
          <img
            src="/images/TrainingApplicationHeader.webp"
            alt="Заголовок для about us"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingApplicationHeader;
