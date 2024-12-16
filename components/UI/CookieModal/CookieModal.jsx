"use client";
import { useState, useEffect } from "react";
import CookieButton from "@/components/UI/Buttons/CookieButton/CookieButton";
import styles from "./CookieModal.module.scss";

export default function CookieModal() {
  const [isCookieAccepted, setIsCookieAccepted] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (accepted) {
      setIsCookieAccepted(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsCookieAccepted(true);
  };

  if (isCookieAccepted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div>
          <img src="/images/icons/cookie.svg" alt="" className={styles.icon} />
        </div>
        <p className={styles.text}>
          Мы используем файлы cookies. Оставаясь на сайте вы соглашаетесь с{" "}
          <a href="/privacy-policy" className={styles.link}>
            Политикой конфиденциальности
          </a>
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <CookieButton text={"Хорошо"} onClick={handleAcceptCookies} />
      </div>
    </div>
  );
}
