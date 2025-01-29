"use client";

import styles from './Section.module.scss';
import {useRef} from "react";

const Section = ({title, isOpen, onToggle, children }) => {
    const sectionRef = useRef(null)
    const onClick = () => {
        onToggle()
        setTimeout(() => {
            if (sectionRef.current)
                sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    }

    return (
        <div ref={sectionRef} className={`${styles.section} ${isOpen ? styles.open : ""}`}>
            <div onClick={onClick} className={styles.sectionHeader}>
                <h4>{title}</h4>
                <img
                    src={
                        isOpen
                            ? "/images/icons/arrow-dropdowsn-up.svg"
                            : "/images/icons/arrow-dropdowsn-down.svg"
                    }
                    alt={isOpen ? "Collapse section" : "Expand section"}
                    className={styles.arrowIcon}
                />
            </div>
            <div className={styles.sectionContent}>{children}</div>
        </div>
    )
};

export default Section;
