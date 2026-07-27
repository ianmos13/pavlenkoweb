'use client'

import styles from "./FormPopup.module.scss";

export default function FormPopup({ onClose, data }) {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h3>{data.title}</h3>
        {data.description &&
          <p>
            {data.description}
          </p>
        }
        <button onClick={onClose} className={styles.closeButton}>
          Закрыть
        </button>
      </div>
    </div>
  );
}