"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import logo from "@/assets/images/Gif_logo.svg";
import ButtonBox from "@/components/UI/Buttons/ButtonBox/ButtonBox";
import Modal from "./PaymentModal/PaymentModal";
import styles from "./DonationComponent.module.scss";
import SubscribeButton from "@/components/UI/Buttons/SubscribeButton/SubscribeButton";

const DonationComponent = ({ id }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [subscriptionConfig, setSubscriptionConfig] = useState({});
  const [isMonthly, setIsMonthly] = useState(true);

  const [fullName, setFullName] = useState("");
  const [showNameOnSite, setShowNameOnSite] = useState(false);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [subscribeNews, setSubscribeNews] = useState(false);
  const [acceptPersonalData, setAcceptPersonalData] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const [fullNameTouched, setFullNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [personalDataTouched, setPersonalDataTouched] = useState(false);

  const isEmailValid = (value) => value.includes("@") && value.includes(".");

  const isFullNameError = fullNameTouched && fullName.trim().length === 0;
  const isEmailError = emailTouched && !isEmailValid(email.trim());
  const isPersonalDataError = personalDataTouched && !acceptPersonalData;

  const isSecondStepValid =
    fullName.trim().length > 0 &&
    isEmailValid(email.trim()) &&
    acceptPersonalData;

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

  const handleGoToStep2 = () => {
    const finalAmount =
      amount === "custom" ? parseFloat(customAmount || "0") : amount;
    if (!finalAmount || finalAmount <= 0) {
      alert("Введите сумму больше 0");
      return;
    }
    setSubscriptionConfig({
      description: `${
        isMonthly ? "Ежемесячное" : "Разовое"
      } пожертвование ${finalAmount} руб`,
      subscription: isMonthly ? { interval: "Month", period: 1 } : undefined,
      amount: finalAmount,
    });
    setCurrentStep(2);
  };

  const handleOpenModal = () => {
    if (!isScriptLoaded) {
      loadPaymentScript();
    }
    if (isSecondStepValid) {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("comment", comment);
      formData.append("amount", subscriptionConfig.amount);
      formData.append("frequency", isMonthly ? "monthly" : "one-time");
      formData.append("subscribeNews", subscribeNews ? "да" : "нет");
      formData.append("showNameOnSite", showNameOnSite ? "да" : "нет");

      fetch("/api/send-donation/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Email sent:", data);
        })
        .catch((error) => {
          console.error("Email error:", error);
        });

      setIsModalOpen(true);
    }
  };

  const handlePaymentSuccess = () => {
    setIsModalOpen(false);
    setCurrentStep(3);
  };

  const amountOptions = ["1000", "500", "300", "custom"];
  const sliderIndex =
    amount === 1000
      ? 0
      : amount === 500
      ? 1
      : amount === 300
      ? 2
      : amount === "custom"
      ? 3
      : 0;
  const optionRefs = useRef([]);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    if (optionRefs.current[sliderIndex]) {
      const { offsetWidth, offsetLeft } = optionRefs.current[sliderIndex];
      setSliderStyle({ width: offsetWidth, left: offsetLeft });
    }
  }, [amount, sliderIndex]);

  const frequencyOptions = ["monthly", "one-time"];
  const frequencyIndex = isMonthly ? 0 : 1;
  const frequencyRefs = useRef([]);
  const [frequencySliderStyle, setFrequencySliderStyle] = useState({
    width: 0,
    left: 0,
  });

  useEffect(() => {
    if (frequencyRefs.current[frequencyIndex]) {
      const { offsetWidth, offsetLeft } = frequencyRefs.current[frequencyIndex];
      setFrequencySliderStyle({ width: offsetWidth, left: offsetLeft });
    }
  }, [isMonthly, frequencyIndex]);

  return (
    <>
      <div
        className={`${styles.donationContainer} ${
          isModalOpen ? styles.blurred : ""
        }`}>
        <h3>
          Вы можете помочь развитию проекта. Проект является некоммерческим
          и&nbsp;работает благодаря{" "}
          <span className={styles.highlight}>поддержке</span> партнёров,
          разделяющих нашу миссию. Резиденты поступают в школу на конкурсной
          основе, обучение для них бесплатно.
        </h3>

        {currentStep === 1 && (
          <>
            <div className={styles.amountSelection}>
              <div className={styles.amountSelectionForm}>
                <h3>Выберите сумму и&nbsp;частоту пожертвования:</h3>
                <div className={styles.segmentedControl}>
                  <div className={styles.segmentedControlAmount}>
                    <div
                      className={styles.slider}
                      style={{
                        width: sliderStyle.width,
                        transform: `translateX(${sliderStyle.left}px)`,
                      }}
                    />
                    {amountOptions.map((value, index) => (
                      <div
                        key={value}
                        className={styles.amountRadioButton}
                        ref={(el) => (optionRefs.current[index] = el)}>
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
                    {/* Ползунок для частоты пожертвований */}
                    <div
                      className={styles.slider}
                      style={{
                        width: frequencySliderStyle.width,
                        transform: `translateX(${frequencySliderStyle.left}px)`,
                      }}
                    />
                    {frequencyOptions.map((freq, index) => (
                      <div
                        key={freq}
                        className={styles.frequencyRadioButton}
                        ref={(el) => (frequencyRefs.current[index] = el)}>
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
                  <div className={styles.firstStepInput}>
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
                  <SubscribeButton
                    text="Поддержать"
                    theme="support"
                    onClick={handleGoToStep2}
                  />
                </ButtonBox>
              </div>

              <div className={styles.supportImg}>
                <Image src={logo} alt="Support Logo" />
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className={styles.infoSelection}>
              <div className={styles.infoSelectionRight}>
                <div className={styles.infoSelectionHeadr}>
                  <div
                    className={styles.secondStepBackLink}
                    onClick={() => setCurrentStep(1)}>
                    <img src="images/icons/back-icon.svg" alt="back" />
                    <p>Назад</p>
                  </div>
                  <h3>Введите контактные данные:</h3>
                </div>

                <div className={styles.infoSelectionForm}>
                  <div className={styles.secondStepInput}>
                    <input
                      id={`fullName_${id}`}
                      type="text"
                      placeholder="ФИО"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onBlur={() => setFullNameTouched(true)}
                      className={isFullNameError ? styles.error : ""}
                    />
                  </div>

                  <div className={styles.secondStepToggleContainer}>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        id={`showNameOnSite_${id}`}
                        checked={showNameOnSite}
                        onChange={(e) => setShowNameOnSite(e.target.checked)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                    <label htmlFor={`showNameOnSite_${id}`}>
                      Согласен на размещение моего имени на сайте
                    </label>
                  </div>

                  <div className={styles.secondStepInput}>
                    <input
                      id={`email_${id}`}
                      type="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setEmailTouched(true)}
                      className={isEmailError ? styles.error : ""}
                    />
                  </div>

                  <div className={styles.secondStepInput}>
                    <div className={styles.textareaWrapper}>
                      <textarea
                        id={`comment_${id}`}
                        placeholder="Комментарий к пожертвованию"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength={800}
                      />
                      <div className={styles.charCounter}>
                        {comment.length}/800
                      </div>
                    </div>
                  </div>

                  <div className={styles.checkboxGroup}>
                    <div className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        id={`subscribeNews_${id}`}
                        checked={subscribeNews}
                        onChange={(e) => setSubscribeNews(e.target.checked)}
                      />
                      <p>Подписаться на рассылку новостей</p>
                    </div>

                    <div className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        id={`acceptPersonalData_${id}`}
                        checked={acceptPersonalData}
                        onChange={(e) =>
                          setAcceptPersonalData(e.target.checked)
                        }
                        onBlur={() => setPersonalDataTouched(true)}
                        className={
                          isPersonalDataError ? styles.errorCheckbox : ""
                        }
                      />
                      <p>
                        Согласие на{" "}
                        <a href="/personal-data-processing-policy">
                          <span className={styles.fullText}>
                            обработку персональных данных
                          </span>
                          <span className={styles.shortText}>
                            обработку перс.данных
                          </span>
                        </a>{" "}
                        и{" "}
                        <a href="/oferta">
                          <span className={styles.fullText}>офертой</span>
                          <span className={styles.shortText}>офертой</span>
                        </a>
                      </p>
                    </div>
                  </div>

                  <ButtonBox className={styles.menuButton}>
                    <SubscribeButton
                      text="Поддержать"
                      theme="support"
                      onClick={handleOpenModal}
                      isDisabled={!isSecondStepValid}
                    />
                  </ButtonBox>
                </div>
              </div>

              <div className={styles.infoSelectionLeft}>
                <div className={styles.supportImg}>
                  <Image src={logo} alt="Support Logo" />
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <div className={styles.txhSelection}>
              <div className={styles.txhSelectionForm}>
                <h4>Спасибо!</h4>
                <h4>
                  Благодаря вашей поддержке, мы сможем продолжать обучать лучших
                  хирургов-онкологов, восполнить нехватку узких специалистов и
                  помочь людям, страдающим от рака в нашей стране.
                </h4>
              </div>

              <div className={styles.supportImg}>
                <Image src={logo} alt="Support Logo" />
              </div>
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          subscriptionConfig={subscriptionConfig}
          isScriptLoaded={isScriptLoaded}
          id={id}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
};

export default DonationComponent;
