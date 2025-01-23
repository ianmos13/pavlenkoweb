import Image from "next/image";
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
            <Image src={TopLeft} alt="image" />
            {TopLeftDescription && <p>{TopLeftDescription}</p>}
          </div>
          <div className={styles.topRightImage}>
            <Image src={TopRight} alt="image" />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomLeftImage}>
            <Image src={BottomLeft} alt="image" />
          </div>
          <div className={styles.bottomRightImage}>
            <Image src={BottomRight} alt="image" />
          </div>
        </div>
      </div>
    </div>
  );
}
