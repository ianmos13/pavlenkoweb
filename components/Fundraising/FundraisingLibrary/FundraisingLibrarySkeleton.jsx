import styles from "./FundraisingLibrarySkeleton.module.scss";

const SKELETON_ITEMS = Array.from({ length: 9 }, (_, index) => index);

const FundraisingLibrarySkeleton = () => {
  return (
    <section className={styles.container} aria-hidden="true">
      <div className={styles.grid}>
        {SKELETON_ITEMS.map((item) => (
          <div key={item} className={styles.card}>
            <div className={`${styles.block} ${styles.image}`} />
            <div className={styles.body}>
              <div className={`${styles.block} ${styles.title}`} />
              <div className={`${styles.block} ${styles.text}`} />
              <div className={`${styles.block} ${styles.textShort}`} />
              <div className={styles.footer}>
                <div className={`${styles.block} ${styles.meta}`} />
                <div className={`${styles.block} ${styles.arrow}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FundraisingLibrarySkeleton;
