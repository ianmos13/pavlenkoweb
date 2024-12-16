import styles from "./ImageWithDescription.module.scss";

const ImageWithDescription = (props) => {
  const { imgPath, textOverlay, years } = props;

  return (
    <div className={styles.container}>
      <div className={styles.photoCard}>
        {years && <div className={styles.years}>{years}</div>}
        <div className={styles.imageContainer}>
          <img src={imgPath} alt="Conference Photo" />
          <div className={styles.textOverlay}>
            <h4>{textOverlay}</h4>
            <p className={styles.author}>Фотограф – ФИО</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageWithDescription;
