"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

const Modal = ({ isOpen, onClose, name, position, biography, photo }) => {
  const [isScroll, setIsScroll] = useState(false);
  const modalContentRef = useRef(null);

  useEffect(() => {
    const preventWheel = (e) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target)
      ) {
        e.preventDefault();
      }
    };

    const preventTouch = (e) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target)
      ) {
        e.preventDefault();
      }
    };

    if (isOpen) {
      document.body.classList.add("modal-open");
      document.documentElement.classList.add("modal-open");

      window.addEventListener("wheel", preventWheel, { passive: false });
      window.addEventListener("touchmove", preventTouch, { passive: false });
    } else {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");

      window.removeEventListener("wheel", preventWheel);
      window.removeEventListener("touchmove", preventTouch);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    if (scrollTop > 0) setIsScroll(true);
    else setIsScroll(false);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalContentRef}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>
            <img
              src="/images/icons/close-icon-dark.svg"
              alt="Close icon dark"
            />
          </button>
        </div>
        <div className={styles.modalData}>
          <div className={styles.modalLeft}>
            <div className={styles.info}>
              <div className={styles.name}>
                <h4>{name}</h4>
              </div>
              <p>{position}</p>
            </div>
            <div className={styles.biography}>
              <p>{biography}</p>
            </div>
          </div>
          <div className={styles.modalRight}>
            <img
              src={photo}
              alt={`${name}'s photo`}
              className={styles.modalImage}
            />
          </div>
        </div>
        <div className={styles.modalDataMobile}>
          <div className={styles.modalDataHeader}>
            <div className={styles.info}>
              <div className={styles.name}>
                <h4>{name}</h4>
              </div>
              <p className={styles.position}>{position}</p>
            </div>
          </div>
          <div
            className={`${styles.modalDataLine} ${
              isScroll ? styles.modalDataLineScroll : ""
            }`}>
            <div className={styles.modalLine}></div>
          </div>
          <div className={styles.modalDataBody} onScroll={handleScroll}>
            <div className={styles.bodyInfo}>
              <div className={styles.imageContainer}>
                <img
                  src={photo}
                  alt={`${name}'s photo`}
                  className={styles.modalImage}
                />
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
