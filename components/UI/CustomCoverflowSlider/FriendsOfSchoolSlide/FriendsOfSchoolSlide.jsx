import styles from "./FriendsOfSchoolSlide.module.scss";

export default function FriendsOfSchoolSlide({ data, isActive }) {
    return (
        <>
            <div className={`${styles.cardContainer} ${isActive ? styles.cardContainerActive : ""} friends-of-school-container`}>
                <img
                    src={data.image}
                    alt={`${data.name}'s photo`}
                    className={styles.imageContainer}
                />
                <div
                    className={`${styles.textContainer} friends-of-school-text-container`}>
                    <div className={styles.track}>
                        <span>
                          <h4>{data.text}</h4>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};
