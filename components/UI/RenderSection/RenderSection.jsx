
import styles from "./RenderSection.module.scss";

const RenderSection = ({ title, content }) => {
  return (
    <div className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.sectionInner}>
        {typeof content === "string" ? (
          content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph.trim()}</p>
          ))
        ) : (
          Object.entries(content).map(([key, value]) => (
            <div key={key} className={styles.subSection}>
              <h3>{key}</h3>
              {value.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RenderSection;
