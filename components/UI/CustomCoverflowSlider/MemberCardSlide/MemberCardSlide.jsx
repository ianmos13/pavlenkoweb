import styles from "./MemberCardSlide.module.scss";

export default function MemberCardSlide({ data }) {
    return (
        <>
            <div className={styles.cardContainer}>
                <div className={styles.imageContainer}>
                    <img
                        src={data.image}
                        alt={`${data.name}'s photo`}
                        className={styles.image}
                    />
                </div>
                <div className={styles.infoContainer}>
                    <h4 className={styles.title}>{data.name}</h4>
                    <p className={styles.text}>{data.text}</p>
                </div>
            </div>
        </>
    );
};
