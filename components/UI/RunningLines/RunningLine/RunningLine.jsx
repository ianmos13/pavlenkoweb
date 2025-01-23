import styles from "./RunningLine.module.scss";

const TextElement = (props) => {
  const { data } = props;

  return (
      <span>
          <h4>{data}</h4>
      </span>
  )
}

const ImageElement = (props) => {
  const { data } = props;

  return (
    <img src={data} alt="" />
  )
}

const RunningLine = (props) => {
  const { data, isImages, reverse } = props;

  return (
    <div className={`${styles.track} ${reverse ? styles.reverse : ""}`}>
        {data.map((element, index) => (
            <>
                {isImages ? (
                    <ImageElement key={index} data={element} />
                ) : (
                    <TextElement key={index} data={element} />
                )}
            </>
        ))}
        {data.map((element, index) => (
            <>
                {isImages ? (
                    <ImageElement key={`duplicate-${index}`} data={element} />
                ) : (
                    <TextElement key={`duplicate-${index}`} data={element} />
                )}
            </>
        ))}
    </div>
  );
};



export default RunningLine;
