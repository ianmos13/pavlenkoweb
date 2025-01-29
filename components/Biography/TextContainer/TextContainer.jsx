import styles from "./TextContainer.module.scss";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
const TextContainer = ({ text }) => {
  return (
    <>
    <AnimatedComponent>
      <section className={`${styles.textContainer} container`}>
        <h3 dangerouslySetInnerHTML={{ __html: text }}></h3>
      </section>
    </AnimatedComponent>
    </>
  );
};

export default TextContainer;
