'use client'

import styles from "./FormPopup.module.scss";

export default function FormPopup({ onClose }) {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h3>Сообщение успешно отправлено!</h3>
        <button onClick={onClose} className={styles.closeButton}>
          Закрыть
        </button>
      </div>
    </div>
  );
}