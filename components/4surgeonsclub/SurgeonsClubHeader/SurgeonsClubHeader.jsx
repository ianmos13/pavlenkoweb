import styles from "./SurgeonsClubHeader.module.scss";

const SurgeonsClubHeader = () => {
  return (
    <section className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.textSection}>
          <h1>4SurgeonsClub</h1>
          <h5>
            Международный образовательный онлайн-проект для онкохирургов под
            эгидой Школы Павленко. Регулярно в прямом эфире проходят тематические
            встречи с разбором лапароскопических, роботических и других операций.
            В заседаниях клуба всегда участвуют приглашенные эксперты,
            практикующие специалисты из разных стран мира.
          </h5>
        </div>
        <div className={styles.imageSection}>
          <img
            src="/images/4club-header.svg"
            alt="4club-header"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default SurgeonsClubHeader;
