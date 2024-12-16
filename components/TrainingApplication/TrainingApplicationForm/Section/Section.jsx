import styles from './Section.module.scss';

const Section = ({ title, isOpen, onToggle, children }) => (
  <div className={`${styles.section} ${isOpen ? styles.open : ""}`}>
    <div onClick={onToggle} className={styles.sectionHeader}>
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
);

export default Section;
