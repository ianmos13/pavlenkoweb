import styles from "./RunningLine.module.scss";

const TextElement = (props) => {
  const { data } = props;
  return (
    <span>
      <h4>{data}</h4>
    </span>
  );
};

const ImageElement = (props) => {
  const { data } = props;
  return <img src={data} alt="" />;
};

const RunningLine = (props) => {
  const { data, isImages, reverse } = props;

  return (
    <div className={`${styles.track} ${reverse ? styles.reverse : ""}`}>
      {data.map((element, index) =>
        isImages ? (
          <div key={`img-${index}`}>
            <ImageElement data={element} />
          </div>
        ) : (
          <div key={`text-${index}`}>
            <TextElement data={element} />
          </div>
        )
      )}
      {data.map((element, index) =>
        isImages ? (
          <div key={`img-dup-${index}`}>
            <ImageElement data={element} />
          </div>
        ) : (
          <div key={`text-dup-${index}`}>
            <TextElement data={element} />
          </div>
        )
      )}
    </div>
  );
};

export default RunningLine;
