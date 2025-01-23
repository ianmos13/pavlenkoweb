'use client'

import styles from "./SubscribePopup.module.scss";

export default function SubscribePopup({ onClose }) {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h3>Вы успешно подписались!</h3>
        <button onClick={onClose} className={styles.closeButton}>
          Закрыть
        </button>
      </div>
    </div>
  );
}