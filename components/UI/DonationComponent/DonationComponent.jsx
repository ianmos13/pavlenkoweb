"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/Gif_logo.svg";
import ButtonBox from "@/components/UI/Buttons/ButtonBox/ButtonBox";
import Modal from "./PaymentModal/PaymentModal";
import styles from "./DonationComponent.module.scss";
import SubscribeButton from "@/components/UI/Buttons/SubscribeButton/SubscribeButton";

const DonationComponent = ({ id }) => {
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [subscriptionConfig, setSubscriptionConfig] = useState({});
  const [isMonthly, setIsMonthly] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const loadPaymentScript = () => {
    if (typeof window !== "undefined" && !window.cp) {
      const script = document.createElement("script");
      script.src = "https://widget.cloudpayments.ru/bundles/paymentblocks.js";
      script.async = true;
      script.onload = () => {
        setIsScriptLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setIsScriptLoaded(true);
    }
  };

  const handleAmountChange = (newAmount) => {
    setAmount(newAmount);
    if (newAmount !== "custom") setCustomAmount("");
  };

  const handleFrequencyChange = (frequency) => {
    setIsMonthly(frequency === "monthly");
  };

  const handleSupportClick = () => {
    const finalAmount =
      amount === "custom" ? parseFloat(customAmount || "0") : amount;
    if (!finalAmount || finalAmount <= 0) {
      alert("Введите сумму больше 0");
      setIsModalOpen(false);
      return;
    }

    if (!isScriptLoaded) {
      loadPaymentScript();
    }

    setSubscriptionConfig({
      description: `${isMonthly ? "Ежемесячное" : "Разовое"} пожертвование ${finalAmount} руб`,
      subscription: isMonthly ? { interval: "Month", period: 1 } : undefined,
      amount: finalAmount,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className={`${styles.donationContainer} ${
          isModalOpen ? styles.blurred : ""
        }`}
      >
        <h3>
          Вы можете помочь развитию проекта. Проект является некоммерческим и&nbsp;работает
          благодаря <span className={styles.highlight}>поддержке</span>{" "}
          партнёров
        </h3>

        <div className={styles.amountSelection}>
          <div className={styles.amountSelectionForm}>
            <h3>Выберите сумму и&nbsp;частоту пожертвования:</h3>

            <div className={styles.segmentedControl}>
              <div className={styles.segmentedControlAmount}>
                {["1000", "500", "300", "custom"].map((value) => (
                  <div className={styles.amountRadioButton} key={value}>
                    <input
                      type="radio"
                      id={`amount${value}_${id}`}
                      name={`amount_${id}`}
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
                    <label htmlFor={`amount${value}_${id}`}>
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
                      id={`${freq}_${id}`}
                      name={`frequency_${id}`}
                      value={freq}
                      checked={isMonthly === (freq === "monthly")}
                      onChange={() => handleFrequencyChange(freq)}
                    />
                    <label htmlFor={`${freq}_${id}`}>
                      {freq === "monthly" ? "Ежемесячно" : "Разово"}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {amount === "custom" && (
              <div className={styles.customAmountInput}>
                <input
                  id={`customAmount_${id}`}
                  type="number"
                  min="1"
                  step="any"
                  placeholder="Введите сумму"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
              </div>
            )}

            <ButtonBox className={styles.menuButton}>
              <SubscribeButton text="Поддержать" theme="support" onClick={handleSupportClick} />
            </ButtonBox>
          </div>

          <div className={styles.supportImg}>
            <Image src={logo} alt="Support Logo" />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          subscriptionConfig={subscriptionConfig}
          isScriptLoaded={isScriptLoaded}
          id={id}
        />
      )}
    </>
  );
};

export default DonationComponent;