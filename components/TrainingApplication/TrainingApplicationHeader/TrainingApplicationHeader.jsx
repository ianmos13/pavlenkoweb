import styles from "./TrainingApplicationHeader.module.scss";

const TrainingApplicationHeader = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContainerInner}>
        <div className={styles.textSection}>
          <h1>
            Анкета <span className={styles.focusText}>на обучение </span> в
            Школе практической онкологии
          </h1>
        </div>
        <div className={styles.imageSection}>
          <img
            src="/images/TrainingApplicationHeader.svg"
            alt="Заголовок для aboutUS"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingApplicationHeader;
