"use client";

import BlocksContainer from "@/components/UI/BlocksContainer/BlocksContainer";
import ApplyButton from "@/components/UI/Buttons/ApplyButton/ApplyButton";
import Heart from "@/public/images/icons/heart-filled-white.svg";
import Logo from "@/public/images/Logos/Logo_Cross_light.svg";
import Image from "next/image";
import styles from "./EducationApplication.module.scss";
import { useRouter } from "next/navigation";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
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
    header: "2 года",
    text: "длительность обучения",
  },
  {
    header: "стипендия",
    text: "во время обучения",
  },
  {
    header: "отбор",
    text: "на конкурсной основе",
  },
];

export default function EducationApplication() {
  const router = useRouter();

  const SendRequest = () => {
	router.push("/application-form")
  };

  return (
    <AnimatedComponent>
    <div className={`${styles.container} container`}>
      <div className={styles.main}>
        <div className={styles.topContainer}>
          <div className={styles.formContainer}>
            <div className={styles.textContainer}>
              <div className={styles.header}>
                <h3 style={{ color: "white" }}>
                  Заявка на <span>обучение</span> <br />в Школе Павленко
                </h3>
              </div>
              <div className={styles.ulContainer}>
                <ul className={styles.list}>
                  {arrayList.map((item, i) => (
                    <li key={i} className={styles.listItem}>
                      <Image src={Heart} alt="Heart" className={styles.icon} />
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
            <Image src={Logo} alt="Logo" className={styles.logo} />
          </div>
        </div>
        <BlocksContainer info={info} />
      </div>
    </div>
    </AnimatedComponent>
  );
}
