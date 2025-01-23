import styles from "./BiographyHeader.module.scss";

const BiographyHeader = () => {
  return (
    <section className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.textSection}>
          <h1>Андрей Николаевич Павленко</h1>
          <h5>
            Один из&nbsp;лучших хирургов-онкологов России, основатель онкологического
            центра «Клиника высоких медицинских технологий имени Н.&nbsp;И.&nbsp;Пирогова
            при&nbsp;Санкт-Петербургском государственном университете».
          </h5>
        </div>
        <div className={styles.imageSection}>
          <img
            src="/images/Biography-main.webp"
            alt="Андрей Николаевич Павленко"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default BiographyHeader;
