import styles from "./ImageWithDescription.module.scss";

const ImageWithDescription = (props) => {
  const { imgPath, textOverlay, years, lastElement } = props;

  return (
    <div className={`${styles.container} ${lastElement ? styles.lastContainer : ''}`}>
      <div className={styles.photoCard}>
        {years && <div className={styles.years}>{years}</div>}
        <div className={styles.imageContainer}>
          <img src={imgPath} alt="Conference Photo" />
          <div className={styles.textOverlay}>
            <h4>{textOverlay}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageWithDescription;
