import styles from "./TextContainer.module.scss";
const TextContainer = ({ text }) => {
  return (
    <>
      <section className={`${styles.textContainer} container`}>
        <h3 dangerouslySetInnerHTML={{ __html: text }}></h3>
      </section>
    </>
  );
};

export default TextContainer;
