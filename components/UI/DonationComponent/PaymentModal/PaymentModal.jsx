"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./PaymentModal.module.scss";

const PaymentModal = ({
  isOpen,
  onClose,
  subscriptionConfig,
  isScriptLoaded,
  id,
}) => {
  const paymentBlockRef = useRef(null);
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(true);

  useEffect(() => {
    if (isOpen && isScriptLoaded && subscriptionConfig) {
      try {
        if (paymentBlockRef.current) {
          paymentBlockRef.current.unmount();
          paymentBlockRef.current = null;
        }

        const paymentBlock = new cp.PaymentBlocks(
          {
            publicId: "test_api_00000000000000000000002",
            description: subscriptionConfig.description,
            amount: subscriptionConfig.amount,
            currency: "RUB",
            invoiceId: `invoice_${Date.now()}_${Math.floor(
              Math.random() * 1000
            )}`,
            accountId: "",
            email: "",
            requireEmail: false,
            language: "ru-RU",
            applePaySupport: true,
            googlePaySupport: true,
            yandexPaySupport: true,
            tinkoffPaySupport: true,
            sbpSupport: false,
            subscription: subscriptionConfig.subscription,
          },
          {
            appearance: {
              colors: {
                primaryButtonColor: "#2e71fc",
                primaryButtonTextColor: "#ffffff",
                primaryHoverButtonColor: "#2e71fc",
                primaryButtonHoverTextColor: "#ffffff",
                activeInputColor: "#0b1e46",
                inputBackground: "#ffffff",
                inputColor: "#8c949f",
                inputBorderColor: "#e2e8ef",
                errorColor: "#eb5757",
              },
              borders: { radius: "8px" },
            },
            components: {
              paymentButton: { text: "Оплатить", fontSize: "16px" },
              paymentForm: {
                labelFontSize: "16px",
                activeLabelFontSize: "12px",
                fontSize: "16px",
              },
            },
          }
        );

        paymentBlock.mount(document.getElementById(`paymentBlockContainer_${id}`));

        paymentBlock.on("destroy", () => console.log("destroy"));
        paymentBlock.on("success", (res) => {
          console.log("success", res);
          onClose();
        });
        paymentBlock.on("fail", (res) => console.log("fail", res));

        paymentBlockRef.current = paymentBlock;
        setIsSpinnerVisible(false);
      } catch (error) {
        console.error("Ошибка создания PaymentBlocks:", error);
      }
    }

    return () => {
      if (paymentBlockRef.current) {
        paymentBlockRef.current.unmount();
        paymentBlockRef.current = null;
      }
    };
  }, [isOpen, isScriptLoaded, subscriptionConfig, onClose, id]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.modalCloseButton} onClick={onClose}>
          ×
        </button>
        {isSpinnerVisible && <div className={styles.spinner}></div>}
        <div id={`paymentBlockContainer_${id}`} />
      </div>
    </div>
  );
};

export default PaymentModal;