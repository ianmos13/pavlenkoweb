"use client";

import React from "react";
import styles from "./DonationPopup.module.scss";
import DonationComponent from "@/components/UI/DonationComponent/DonationComponent";

export default function DonationPopup({ togglePopup, uuid }){
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <button className={styles.closeButton} onClick={togglePopup}>
                        <img
                            src="/images/icons/close-icon-dark.svg"
                            alt="Close icon dark"
                        />
                    </button>
                </div>
                <div className={styles.modalData}>
                    <DonationComponent id={uuid} />
                </div>
            </div>
        </div>
    );
};

