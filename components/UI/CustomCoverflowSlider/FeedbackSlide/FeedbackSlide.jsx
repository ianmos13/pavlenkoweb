import styles from "./FeedbackSlide.module.scss";
import React, {useEffect, useRef, useState} from "react";

export default function FeedbackSlide({ data, isActive, togglePopup }) {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        const element = textRef.current;
        if (element) {
            const isOverflow = element.children[0].scrollHeight > 239;
            setIsOverflowing(isOverflow);
        }
    }, [data.text]);

    return (
        <>
            <div className={`${styles.feedbackContainer} ${isActive ? styles.feedbackContainerActive : ""}`}>
                <div className={styles.imageContainer}> </div>
                <div ref={textRef} className={`${isOverflowing ? styles.overflowTextContainer : styles.textContainer} `}>
                    <p>{data.text}</p>
                </div>
                <div className={styles.infoContainer}>
                    <p className={`small ${styles.dateContainer}`}>{data.date}</p>
                    <p className={`small ${styles.dateContainer}`}>{data.city}</p>
                </div>
                {isOverflowing && (
                    <div
                        className={styles.linkContainer}
                        onClick={() => {
                            togglePopup(data);
                        }}>
                        <div className={styles.linkText}>Читать полностью</div>
                        <div className={styles.iconContainer}>
                            <svg className={styles.icon} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
