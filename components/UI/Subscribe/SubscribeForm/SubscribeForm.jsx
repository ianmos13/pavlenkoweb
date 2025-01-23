'use client'
import SubscribeButton from "@/components/UI/Buttons/SubscribeButton/SubscribeButton";
import styles from "./SubscribeForm.module.scss";
import { useState } from "react";

export default function SubscribeForm({ setIsPopupVisible, theme }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = async () => {
    if (!email) {
      setError("Введите ваш e-mail.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Пожалуйста, введите корректный e-mail.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsPopupVisible(true);
        setEmail("");
      } else {
        setError(result.error || "Что-то пошло не так. Попробуйте снова.");
      }
    } catch (error) {
      setError("Ошибка соединения. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.mainContainer} ${styles[`${theme}Container`]}`}>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
        <SubscribeButton
          text={isLoading ? "Загрузка..." : "Подписаться"}
          onClick={handleSubscribe}
          theme={theme}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.label}>
        <label>
          Нажимая на кнопку, вы даете согласие на{" "}
          <a
              href="/ersonal-data-processing-policy"
              className={styles.link}
              target="_blank">
            обработку персональных данных
          </a>
          {" "}и соглашаетесь с{" "}
          <a
            href="/privacy-policy"
            className={styles.link}
            target="_blank">
            политикой конфиденциальности
          </a>
        </label>
      </div>
    </div>
  );
}