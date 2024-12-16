'use client'
import { useRouter } from 'next/navigation'
import RQ from "@/components/UI/RQ/RQ";
import styles from "./NotFound.module.scss";
import ButtonBox from "@/components/UI/Buttons/ButtonBox/ButtonBox";
import LearnMoreButton from "@/components/UI/Buttons/LearnMoreButton/LearnMoreButton";

const NotFound = () => {
  const router = useRouter();


  const goToHomePage = () => {
    router.push("/"); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.notFoundContainer}>
        <h1 className={styles.title}>Страница не найдена</h1>
        <div className={styles.description}>
          <h3>
            Возможно, она устарела, была удалена, или был введен<br></br>
            неверный адрес в адресной строке.
          </h3>
        </div>
        <div className={styles.description}>
          <ButtonBox className={styles.button}>
            <LearnMoreButton text={"Перейти на главную"} theme={"red"} onClick={goToHomePage} />
          </ButtonBox>
        </div>
      </div>
      <div className={styles.headerContainer}>
        <h2>Остались вопросы?</h2>
      </div>
      <RQ />
    </div>
  );
};

export default NotFound;
