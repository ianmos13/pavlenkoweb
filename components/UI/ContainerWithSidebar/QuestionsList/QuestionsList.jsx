"use client";
import { useEffect, useState } from "react";
import styles from "./QuestionsList.module.scss";

const QuestionsList = ({ questions, withBc, withPadding, separator }) => {
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    setExpanded({});
  }, [questions]);

  const toggleQuestion = (questionIndex) => {
    setExpanded((prevState) => ({
      ...prevState,
      [questionIndex]: !prevState[questionIndex],
    }));
  };

  return (
      <div className={styles.questionsList}>
        {questions.map((question, index) => (
            <div
                key={index}
                className={`${styles.questionContainer} ${withBc && styles.withBc} ${withPadding && styles.withPadding}`}>
              <div
                  className={styles.question}
                  onClick={() => toggleQuestion(index)}>
                <h4>{question.question}</h4>
                <img
                    src={
                      expanded[index]
                          ? "/images/icons/arrow-dropdowsn-up.svg"
                          : "/images/icons/arrow-dropdowsn-down.svg"
                    }
                    alt="Toggle Arrow"
                    className={styles.toggleArrow}
                />
              </div>
              <div
                  className={`${styles.answer} ${expanded[index] ? styles.expanded : ""}`}>
                <div
                    className={`${styles.margin} ${expanded[index] ? styles.expanded : ""}`}></div>
                <h5>{question.answer}</h5>
              </div>
              {separator && <div className={styles.separator}></div>}
            </div>
        ))}
      </div>
  );
};

export default QuestionsList; // Добавление экспорта компонента
