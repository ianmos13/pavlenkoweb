import styles from "./Pozshertvovanie.module.scss";
import DonationComponent from "../UI/DonationComponent/DonationComponent";

const Pozshertvovanie = () => {
  return (
    <section className={styles.container}>
      <div className={styles.titelData}>
        <h1>Хотите помочь проекту?</h1>
        <h3>У нас есть 3 доступных варианта, как это можно сделать:</h3>
      </div>
      <div className={styles.DonationComponent}>
      <DonationComponent id="pozshertvovanie" />
      </div>
      <div className={styles.checkingAccount}>
        <h3>
          Также вы можете перечислить на расчетный счет пожертвование с
          назначением платежа «Пожертвование на уставные цели».
        </h3>
        <div className={styles.checkingData}>
          <p>Банковские реквизиты школы:</p>
          <p>Банк ПАО СБЕРБАНК</p>
          <p>Р/с 40703810738000001458</p>
          <p>БИК 044525225</p>
          <p>К/с 30101810400000000225</p>
          <p>ИНН 7811740880</p>
          <p>КПП 781101001</p>
          <p>ОГРН 1197800005193</p>
        </div>
        <p>
          Отправляя пожертвование, вы соглашаетесь с{" "}
          <a href="/oferta">
            <span className={styles.fullText}>Договором Офертой</span>
          </a>
        </p>
      </div>
      <h3>
        Или отправить пожертвование, отсканировав QR-код или нажав на него:
      </h3>
      <a className={styles.qr} target="_blank" href="https://qr.nspk.ru/AS1A0033BT9C1GM19OUQLCKEDAUNVNTU?type=01&bank=100000000111&crc=2F31">
        <img src="/images/QR.png" className="" alt="qr"></img>
      </a>
      <div>
        <p>QR-код работает с системой быстрых платежей. Для подключения системы:</p>
        <p>1. Зайдите в приложение и в левом верхнем углу выберите свой профиль.</p>
        <p>2. В правом верхнем углу нажмите на значок шестеренки.</p>
        <p>3. Прокрутите экран вниз и выберите пункт «Система быстрых платежей».</p>
        <p>4. В блоке «Входящие переводы» нажмите «Подключить».</p>
      </div>
      <p>
          Отправляя пожертвование, вы соглашаетесь с{" "}
          <a href="/oferta">
            <span className={styles.fullText}>Договором Офертой</span>
          </a>
        </p>
    </section>
  );
};

export default Pozshertvovanie;
