"use client";
import styles from "./AboutUsHeader.module.scss";
import RunningLine from "@/components/UI/RunningLines/RunningLine/RunningLine";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";

const AboutUsHeader = () => {
  const { data, loading, error } = useFetch("/running-line-about-us");

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContainerInner}>
        <div className={styles.textSection}>
          <h1>О проекте</h1>
          <h5>
            Школа Павленко – некоммерческий образовательный проект по&nbsp;подготовке специализированных хирургов-онкологов для&nbsp;выпускников ординатур. Наши резиденты и&nbsp;выпускники уже&nbsp;помогают тысячам пациентов с&nbsp;диагнозом рак в&nbsp;разных городах страны.
            <br />
            <br />
            Проект является некоммерческим и&nbsp;работает благодаря поддержке партнеров и&nbsp;доноров, разделяющих нашу миссию.
          </h5>
        </div>
        <div className={styles.imageSection}>
          <img
            src="/images/aboutUS-header.webp"
            alt="Заголовок для about us"
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.runningLine}>
        <div className={styles.lines}>
          {data?.data && <RunningLine data={data.data} />}
        </div>
      </div>
    </div>
  );
};

export default AboutUsHeader;
