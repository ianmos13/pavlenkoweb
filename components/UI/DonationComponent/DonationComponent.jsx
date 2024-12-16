"use client";

import logo from "@/assets/images/Gif_logo.svg";
import ButtonBox from "@/components/UI/Buttons/ButtonBox/ButtonBox";
import SupportButton from "@/components/UI/Buttons/SupportButton/SupportButton";
import Image from "next/image";
import { useState } from "react";
import styles from "./DonationComponent.module.scss";

const DonationComponent = () => {
  const [amount, setAmount] = useState(1000);
  const [isMonthly, setIsMonthly] = useState(true);

  const handleAmountChange = (newAmount) => setAmount(newAmount);

  const handleFrequencyChange = (frequency) =>
    setIsMonthly(frequency === "monthly");

  const handleSupportClick = () => {
    let url;

    if (amount === 1000 && isMonthly) {
      url =
        "https://c.cloudpayments.ru/payments/e7c5950619b84558beaafb20ea05240e";
    } else if (amount === 1000 && !isMonthly) {
      url =
        "https://c.cloudpayments.ru/payments/bd867356e61b4cf39d7d2124c8ef65e1";
    } else if (amount === 500 && isMonthly) {
      url =
        "https://c.cloudpayments.ru/payments/b4ff9d4f1dac40709d46b4d5c1b655ef";
    } else if (amount === 500 && !isMonthly) {
      url =
        "https://c.cloudpayments.ru/payments/b7d6cfc3c049422aacf23ff704521aae";
    } else if (amount === 300 && isMonthly) {
      url =
        "https://c.cloudpayments.ru/payments/b7d6cfc3c049422aacf23ff704521aae";
    } else if (amount === 300 && !isMonthly) {
      url =
        "https://c.cloudpayments.ru/payments/860ba92d9d0d4cb4858d5f8850e040ea";
    } else if (amount === "custom" && isMonthly) {
      url =
        "https://c.cloudpayments.ru/payments/4935b61bf09f4770b56032f34747fa6b";
    } else if (amount === "custom" && !isMonthly) {
      url =
        "https://c.cloudpayments.ru/payments/e18b315e66514b5094f2ee6ab0283d95";
    }

    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className={styles.donationContainer}>
      <h3>
        Вы можете помочь развитию проекта. Проект является некоммерческим и
        работает благодаря <span className={styles.highlight}>поддержке</span>{" "}
        партнёров, разделяющих нашу миссию. Резиденты поступают в школу на
        конкурсной основе, обучение для них бесплатно.
      </h3>

      <div className={styles.amountSelection}>
        <div className={styles.amountSelectionForm}>
          <h3>Выберите сумму и частоту пожертвования:</h3>

          <div className={styles.segmentedControl}>
            <div className={styles.segmentedControlAmount}>
              {["1000", "500", "300", "custom"].map((value) => (
                <div className={styles.amountRadioButton} key={value}>
                  <input
                    type="radio"
                    id={`amount${value}`}
                    name="amount"
                    value={value}
                    checked={
                      amount ===
                      (value === "custom" ? "custom" : parseInt(value))
                    }
                    onChange={() =>
                      handleAmountChange(
                        value === "custom" ? "custom" : parseInt(value)
                      )
                    }
                  />
                  <label htmlFor={`amount${value}`}>
                    {value === "custom" ? "Другая сумма" : `${value} ₽`}
                  </label>
                </div>
              ))}
            </div>

            <div className={styles.segmentedControlFrequency}>
              {["monthly", "one-time"].map((freq) => (
                <div className={styles.frequencyRadioButton} key={freq}>
                  <input
                    type="radio"
                    id={freq}
                    name="frequency"
                    value={freq}
                    checked={isMonthly === (freq === "monthly")}
                    onChange={() => handleFrequencyChange(freq)}
                  />
                  <label htmlFor={freq}>
                    {freq === "monthly" ? "Ежемесячно" : "Разово"}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <ButtonBox className={styles.menuButton}>
            <SupportButton theme="red" onClick={handleSupportClick} />
          </ButtonBox>
        </div>

        <div className={styles.supportImg}>
          <Image src={logo} alt="Support Logo" />
        </div>
      </div>

      <div className={styles.info}>
        {[
          {
            title: "наша миссия",
            text: "Повысить компетентность хирургов-онкологов в России и увеличить выживаемость больных с диагнозом рак.",
          },
          {
            title: "не менее 2000",
            text: "Больших операций выполнит каждый из наших выпускников за свою карьеру.",
          },
          {
            title: "на 25%",
            text: "Хирурги, получившие целевую квалификацию в школе, повышают выживаемость пациентов.",
          },
          {
            title: "перечисляя 300 руб",
            text: "Ежемесячно за год вы становитесь спонсором одной будущей операции нашего резидента.",
          },
        ].map((item, index) => (
          <div className={styles.infoItem} key={index}>
            <h3 className="secondary">{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationComponent;
