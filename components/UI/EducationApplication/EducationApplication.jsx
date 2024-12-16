'use client'
"use client";

import BlocksContainer from "@/components/UI/BlocksContainer/BlocksContainer";
import ApplyButton from "@/components/UI/Buttons/ApplyButton/ApplyButton";
import Heart from "@/public/images/icons/heart-filled-white.svg";
import Logo from "@/public/images/Logos/Logo_Cross_light.svg";
import Image from "next/image";
import styles from "./EducationApplication.module.scss";
import { useRouter } from "next/navigation";
const arrayList = [
  {
    text: "В феврале идет набор по специализациям Онкогинекология и Upper GI",
  },
  {
    text: "Круглогодичный набор по специализациям Торакальную хирургию и Онкоурология (голова и шея)",
  },
];

const info = [
  {
    header: "обучение",
    text: "на бесплатной основе",
  },
  {
    header: "обучение",
    text: "на бесплатной основе",
  },
  {
    header: "обучение",
    text: "на бесплатной основе",
  },
  {
    header: "обучение",
    text: "на бесплатной основе",
  },
];

export default function EducationApplication() {
  const router = useRouter();

  const SendRequest = () => {
	router.push("/training-application-form")
  };

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.main}>
        <div className={styles.topContainer}>
          <div className={styles.formContainer}>
            <div className={styles.textContainer}>
              <div className={styles.header}>
                <h3 style={{ color: "white" }}>
                  Заявка на <span>обучение</span> <br />в Школе практической
                  онкологии
                </h3>
              </div>
              <div className={styles.ulContainer}>
                <ul className={styles.list}>
                  {arrayList.map((item) => (
                    <li key={item.id} className={styles.listItem}>
                      <Image src={Heart} className={styles.icon} />
                      <h4 style={{ color: "white" }}>{item.text}</h4>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <ApplyButton
                onClick={SendRequest}
                text={"Подать заявку"}
              />
            </div>
          </div>
          <div className={styles.logoContainer}>
            <Image src={Logo} className={styles.logo} />
          </div>
        </div>
        <BlocksContainer info={info} />
      </div>
    </div>
  );
}
