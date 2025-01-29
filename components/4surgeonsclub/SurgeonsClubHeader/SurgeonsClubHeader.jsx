import styles from "./SurgeonsClubHeader.module.scss";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

const SurgeonsClubHeader = () => {
  return (
    <AnimatedComponent>
      <section className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.textSection}>
            <h1>4SurgeonsClub</h1>
            <h5>
              Международный образовательный онлайн-проект для&nbsp;онкохирургов под&nbsp;эгидой
              Школы Павленко. Регулярно в&nbsp;прямом эфире проходят тематические
              встречи с&nbsp;разбором лапароскопических, роботических и&nbsp;других операций.
              В&nbsp;заседаниях клуба всегда участвуют приглашенные эксперты,
              практикующие специалисты из&nbsp;разных стран мира.
            </h5>
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
    </AnimatedComponent>
  );
};

export default SurgeonsClubHeader;
