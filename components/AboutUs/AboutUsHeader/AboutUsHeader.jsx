import styles from "./AboutUsHeader.module.scss";
import RunningLine from "@/components/UI/RunningLines/RunningLine/RunningLine";

const AboutUsHeader = () => {
  const data = [
    "Воспитать “золотую сотню” онкохирургов",
    "Повысить выживаемость пациентов с онкологическими диагнозами",
    "Создать и развивать крепкое сообщество неравнодушных профессионалов",
  ];

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContainerInner}>
        <div className={styles.textSection}>
          <h1>О проекте</h1>
          <h5>
            Школа Павленко – это единственный в России проект по подготовке
            специализированных хирургов-онкологов для выпускников ординатур.
            Наши резиденты и выпускники уже помогают тысячам пациентов с
            диагнозом рак в разных городах страны.
            <br />
            <br />
            Проект является некоммерческим и работает благодаря поддержке
            партнеров и доноров, разделяющих нашу миссию.
          </h5>
        </div>
        <div className={styles.imageSection}>
          <img
            src="/images/aboutUS-header.svg"
            alt="Заголовок для aboutUS"
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.runningLine}>
        <div className={styles.lines}>
          <RunningLine data={data} />
        </div>
      </div>
    </div>
  );
};

export default AboutUsHeader;
