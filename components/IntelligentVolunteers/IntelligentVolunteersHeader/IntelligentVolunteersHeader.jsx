import styles from "./IntelligentVolunteersHeader.module.scss";
const IntelligentVolunteersHeader = () => {
  return (
    <section className={styles.container}>
      <div className={`${styles.headerContainer} container`}>
        <div className={styles.textSection}>
          <h1>Интеллектуальные волонтеры проекта</h1>
          <h5>Это профессионалы, которые разделяют ценности школы  и помогают нам воплощать миссию – подготовить “золотую сотню” онкохирургов</h5>
        </div>
        <div className={styles.imageSection}>
          <img
            src="/images/4club-header.webp"
            alt="4club-header"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default IntelligentVolunteersHeader;
