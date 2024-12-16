import styles from "./Сollaboration.module.scss";

const Сollaboration = () => {
  return (
    <section className={`${styles.container} container`}>
        <div className={styles.containerInner}>
          <div className={styles.info}>
            <h3>
              Если вы хотите стать другом школы и помочь<br /> проекту в
              качестве фотографа, видеографа или<br />другим профессиональным
              навыком, напишите нам
            </h3>
          </div>
          <div className={styles.contacts}>
            <h3>
              <a href="mailto:info@shkolapavlenko.ru">info@shkolapavlenko.ru</a>
            </h3>
          </div>
        </div>
    </section>
  );
};

export default Сollaboration;
