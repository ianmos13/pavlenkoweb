"use client";

import React from "react";
import styles from './InstructionForUse.module.scss'

const InstructionForUse = () => {

  return (
    <section className={`${styles.block} container`}>
      <div className={styles.container}>
        <h2>Создать сбор очень просто</h2>
        <div className={styles.textContainer}>
          <p className={styles.text}>
            Вы можете сделать сбор в&nbsp;пользу школы в&nbsp;честь своего дня рождения, свадьбы, дня врача или просто так, без&nbsp;повода.
          </p>
          <p className={styles.text}>
            Школа это некоммерческий проект, и&nbsp;мы обучаем наших резидентов благодаря поддержке друзей хирургов.
          </p>
        </div>

        <div className={styles.blocksContainer}>
          {info?.map((infoItem, index) => (
            <div className={styles.block} key={index}>
              <div className={styles.title}>{infoItem.header}</div>
              <p className={styles.text}>{infoItem.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructionForUse;

const info = [
  {
    header: '1. Создайте сбор',
    text: "заполните необходимые поля для\u00A0создания вашего сбора за\u00A05 минут",
  },
  {
    header: '2. Дождитесь одобрения',
    text: 'модераторы проверят сбор — это займёт немного времени, ответ придет на\u00A0почту',
  },
  {
    header: '3. Поделитесь с\u00A0друзьями',
    text: 'отправьте ссылку на\u00A0сбор в\u00A0соцсетях или личным сообщением',
  },
]