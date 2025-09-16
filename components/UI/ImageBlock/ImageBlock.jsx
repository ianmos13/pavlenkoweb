import styles from "./ImageBlock.module.scss";

export default function ImageBlock({
  TopLeft,
  TopLeftDescription,
  TopRight,
  BottomLeft,
  BottomRight,
}) {
  return (
      <div className={styles.adaptiveContainer}>
        <div className={styles.gridContainer}>
          <div className={styles.top}>
            <div className={styles.topLeftImage}>
              <img src={TopLeft || "/images/default-photo.svg"} alt="image" />
              {TopLeftDescription && <p>{TopLeftDescription}</p>}
            </div>
            <div className={styles.topRightImage}>
              <img src={TopRight || "/images/default-photo.svg"} alt="image" />
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottomLeftImage}>
              <img src={BottomLeft || "/images/default-photo.svg"} alt="image" />
            </div>
            <div className={styles.bottomRightImage}>
              <img src={BottomRight || "/images/default-photo.svg"} alt="image" />
            </div>
          </div>
        </div>
      </div>
  );
}
