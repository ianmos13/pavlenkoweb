"use client"

import React, {useState} from "react";
import styles from "./Modal.module.scss";

const Modal = ({ isOpen, onClose, name, position, biography, photo }) => {
  if (!isOpen) return null;
  const [isScroll, setIsScroll] = useState(false);
  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    if(scrollTop > 0)
      setIsScroll(true);
    else
      setIsScroll(false);
  };

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
        <div className={styles.modalDataMobile}>
          <div className={styles.modalDataHeader}>
            <div className={styles.info}>
              <div className={styles.name}>
                {" "}
                <h4>{name}</h4>
              </div>
              <p className={styles.position}>{position}</p>
            </div>
          </div>
          <div className={`${styles.modalDataLine} ${isScroll ? styles.modalDataLineScroll : ''}`}>
            <div className={styles.modalLine}></div>
          </div>
          <div className={styles.modalDataBody}
               onScroll={handleScroll}
          >
            <div className={styles.bodyInfo}>
              <div className={styles.imageContainer}>
                <img src={photo} alt="" className={styles.modalImage} />
              </div>
              <div className={styles.biography}>
                <p>{biography}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
