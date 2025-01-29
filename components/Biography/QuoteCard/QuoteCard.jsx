import styles from "./QuoteCard.module.scss";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

const QuoteCard = ({ author, text }) => {
  return (
    <AnimatedComponent>
    <section className={`${styles.quoteContainer} container`}>
      <div className={styles.quoteCard}>
        <div className={styles.author}>
          <img
            className={styles.quoteIcon}
            src="images/icons/Quote.svg"
            alt="Quote Icon"
          />
          <h2>{author}</h2>
        </div>
        <div className={styles.quoteText}>
          <h3>{text}</h3>
        </div>
      </div>
    </section>
    </AnimatedComponent>
  );
};

export default QuoteCard;
