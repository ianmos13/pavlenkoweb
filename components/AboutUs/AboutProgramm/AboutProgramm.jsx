import styles from "./AboutProgramm.module.scss";

const AboutProgramm = () => {
  return (
    <section className={`${styles.block} container`}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h3 className={styles.text}>
            <span className={styles.focusText}>Программа Школы Павленко</span>
            является аналогом международного fellowship (специализации) по&nbsp;хирургической
            онкологии, который за&nbsp;счет наставничества и&nbsp;большого
            количества практики позволяет хирургу с&nbsp;базовым опытом стать за&nbsp;два
            года самостоятельным хирургом-онкологом по&nbsp;определенной локализации.
          </h3>
          <h3 className={styles.text}>
            В&nbsp;каждом наборе школы в&nbsp;среднем учится от&nbsp;двух до&nbsp;семи
            хирургов-онкологов. Такое количество кажется небольшим лишь на&nbsp;первый взгляд.
          </h3>
          <h3 className={styles.text}>
            Так, один из&nbsp;ведущих университетов мира, Jonh Hopkins
            выпускает в&nbsp;рамках fellowship всего двух врачей по&nbsp;каждой
            специализации в&nbsp;год. Всего в&nbsp;США 38 программ fellowships, на&nbsp;которых
            единовременно обучаются не&nbsp;более 80 хирургов.
          </h3>
        </div>
        <h2>Принципы подготовки хирургов</h2>
        <div className={styles.blocksContainer}>
          <div className={styles.block}>
            <h3 className={`secondary`}>ежедневная практика</h3>
            <p className={styles.text}>
              Минимум 40 самостоятельных операций и 150&nbsp;ассистенций за&nbsp;2&nbsp;года
              обучения, также предусмотрены ежегодные хирургические интенсивы
            </p>
          </div>
          <div className={styles.block}>
            <h3 className={`secondary`}>работа с&nbsp;наставником</h3>
            <p className={styles.text}>
            За&nbsp;каждым резидентом закреплен наставник – ведущий специалист в&nbsp;своей области
            </p>
          </div>
          <div className={styles.block}>
            <h3 className={`secondary`}>мульти - дисциплиность</h3>
            <p className={styles.text}>
            Двухлетняя авторская программа помимо практики включает в&nbsp;себя теоретический блок, а&nbsp;также
              развивает навыки коммуникации и&nbsp;эмоциональный интеллект
            </p>
          </div>
          <div className={styles.block}>
            <h3 className={`secondary`}>стажировки и ротации </h3>
            <p className={styles.text}>
            За время обучения резиденты направляются на&nbsp;другие клинические базы и в&nbsp;другие города для&nbsp;получения разностороннего опыта
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProgramm;
