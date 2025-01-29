'use client'

import Logo from "@/public/images/Logos/Logo_Cross.svg";
import Image from "next/image";
import styles from "./Subscribe.module.scss";
import { useState } from "react";
import SubscribeForm from "@/components/UI/Subscribe/SubscribeForm/SubscribeForm";
import SubscribePopup from "@/components/UI/Subscribe/SubscribePopup/SubscribePopup";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

export default function Subscribe() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <AnimatedComponent>
      <section className={`${styles.container} container`}>
        <div className={styles.mainContainer}>
          <div className={styles.formContainer}>
            <div className={styles.header}>
              <h3>Подпишись на рассылку!</h3>
              <h4>
                Каждый месяц мы делимся главными новостями проекта. Подпишитесь,
                чтобы узнавать о новых наборах на обучение, событиях, конференциях
                и интересных мероприятиях с участием школы.
              </h4>
            </div>
            <div className={styles.inputContainer}>
              <SubscribeForm setIsPopupVisible={setIsPopupVisible} />
              <div className={styles.tabLogo}>
                <Image src={Logo} className={styles.logo} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.logoContainer}>
            <Image src={Logo} className={styles.logo} alt="" />
          </div>
        </div>
        {isPopupVisible && <SubscribePopup onClose={() => setIsPopupVisible(false)} />}
      </section>
    </AnimatedComponent>
  );
}