'use client'
import React, { useState } from "react";
import Modal from "./Modal/Modal";
import styles from "./PersonItem.module.scss";

const PersonItem = ({ name, position, biography, avatar, photo }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
   
      <div className={styles.personItem}>
        <div className={styles.personSection} onClick={handleModalOpen}>
          <div className={styles.personContent}>
            <div className={styles.personName}>
              <h5>{name}</h5>
            </div>
            <p className={styles.personPosition}>{position}</p>
          </div>
          <div className={styles.icon}>
            <img
              src={"/images/icons/right-arrow-bold.svg"}
              alt="Bold Arrow Icon"
            />
          </div>
        </div>
        <div className={styles.personImage}>
          <img src={avatar} alt={name} className={styles.image} />
        </div>
      </div>

      
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        name={name}
        position={position}
        biography={biography}
        photo={photo}
      />
    </div>
  );
};

export default PersonItem;
