import styles from "./AboutProgramm.module.scss";

const AboutProgramm = () => {
  return (
    <section className={`${styles.block} container`}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h3 className={styles.text}>
            <span className={styles.focusText}>Программа Школы Павленко</span>
            является аналогом международного fellowship (специализации) по
            хирургической онкологии, который за счет наставничества и большого
            количества практики позволяет хирургу с базовым опытом стать за два
            года самостоятельным хирургом-онкологом по определенной локализации.
          </h3>
          <h3 className={styles.text}>
            В каждом наборе школы в среднем учится от двух до семи
            хирургов-онкологов. Такое количество кажется небольшим лишь на
            первый взгляд.
          </h3>
          <h3 className={styles.text}>
            Так, один из ведущих университетов мира,
            <a className={styles.link} href="#">
              Jonh Hopkins
            </a>
            выпускает в рамках fellowship всего двух врачей по каждой
            специализации в год. Всего в США 38 программ fellowships, на которых
            единовременно обучаются не более 80 хирургов.
          </h3>
        </div>
        <h2>Принципы подготовки хирургов</h2>
        <div className={styles.blocksContainer}>
          <div className={styles.block}>
            <h3 className={`secondary`}>ежедневная практика</h3>
            <p className={styles.text}>
              Минимум 40 самостоятельных операций и 150 ассистенций за 2 года
              обучения, также предусмотрены ежегодные хирургические интенсивы
            </p>
          </div>
          <div className={styles.block}>
            <h3 className={`secondary`}>работа с наставником</h3>
            <p className={styles.text}>
            За каждым резидентом закреплен наставник – ведущий специалист в своей области
            </p>
          </div>
          <div className={styles.block}>
            <h3 className={`secondary`}>мульти - дисциплиность</h3>
            <p className={styles.text}>
            Двухлетняя авторская программа помимо практики включает в себя теоретический блок, а также развивает навыки коммуникации и эмоциональный интеллект
            </p>
          </div>
          <div className={styles.block}>
            <h3 className={`secondary`}>стажировкии ротации </h3>
            <p className={styles.text}>
            За время обучения резиденты направляются на другие клинические базы и в другие города для получения разностороннего опыта
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProgramm;
