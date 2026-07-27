import styles from "./FundraisingItemSkeleton.module.scss";

const FundraisingItemSkeleton = () => {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <section className={styles.banner}>
        <div className={`${styles.bannerInner} container`}>
          <div className={styles.bannerContent}>
            <div className={`${styles.block} ${styles.tag}`} />
            <div className={`${styles.block} ${styles.title}`} />
            <div className={`${styles.block} ${styles.titleShort}`} />
            <div className={styles.actions}>
              <div className={`${styles.block} ${styles.button}`} />
              <div className={`${styles.block} ${styles.buttonOutline}`} />
            </div>
          </div>
          <div className={`${styles.block} ${styles.bannerImage}`} />
        </div>
      </section>

      <section className={`${styles.infoSection} container`}>
        <div className={styles.infoCard}>
          <div className={`${styles.block} ${styles.sectionTitle}`} />
          <div className={styles.infoHeader}>
            <div className={`${styles.block} ${styles.infoLabel}`} />
            <div className={`${styles.block} ${styles.infoLabel}`} />
          </div>
          <div className={`${styles.block} ${styles.textLine}`} />
          <div className={`${styles.block} ${styles.textLine}`} />
          <div className={`${styles.block} ${styles.textLineShort}`} />

          <div className={styles.progressCard}>
            <div className={`${styles.block} ${styles.progressTitle}`} />
            <div className={styles.progressValues}>
              <div className={`${styles.block} ${styles.progressValue}`} />
              <div className={`${styles.block} ${styles.progressValue}`} />
            </div>
            <div className={`${styles.block} ${styles.progressBar}`} />
            <div className={`${styles.block} ${styles.progressComment}`} />
          </div>
        </div>
      </section>

      <section className={styles.donationSection}>
        <div className={`${styles.donationInner} container`}>
          <div className={`${styles.block} ${styles.donationTitle}`} />
          <div className={styles.amounts}>
            <div className={`${styles.block} ${styles.amount}`} />
            <div className={`${styles.block} ${styles.amount}`} />
            <div className={`${styles.block} ${styles.amount}`} />
            <div className={`${styles.block} ${styles.amount}`} />
          </div>
          <div className={`${styles.block} ${styles.input}`} />
          <div className={`${styles.block} ${styles.input}`} />
        </div>
      </section>
    </div>
  );
};

export default FundraisingItemSkeleton;
