// Modal.js
import React from "react";

import styles from "./Modal.module.scss";

const Modal = ({ isOpen, onClose, name, position, biography, photo }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>
           <img src="/images/icons/close-icon-dark.svg" alt="Close icon dark" />
          </button>
        </div>
        <div className={styles.modalData}>
          <div className={styles.modalLeft}>
            <div className={styles.info}>
              <div className={styles.name}>
                {" "}
                <h4>{name}</h4>
              </div>

              <p>{position}</p>
            </div>
            <div className={styles.biography}>
              <p>{biography}</p>
            </div>
          </div>
          <div className={styles.modalRight}>
            <img src={photo} alt="" className={styles.modalImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
