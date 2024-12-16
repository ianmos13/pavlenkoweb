import styles from "./InputGroup.module.scss";
import React, { useState, useEffect } from "react";

const InputGroup = ({
  type = "text",
  name,
  placeholder,
  maxLength = 800,
  spanText = "", 
  onChange,
  value = "", 
}) => {
  const [charCount, setCharCount] = useState(value.length);

  useEffect(() => {
 
    setCharCount(value.length);
  }, [value]);

  const handleInputChange = (e) => {
    setCharCount(e.target.value.length);
    if (onChange) onChange(e);
  };

  return (
    <div className={styles.inputGroup}>
      {type === "textarea" ? (
        <div className={styles.textAreaContainer}>
          <textarea
            name={name}
            maxLength={maxLength}
            className={styles.inputField}
            placeholder={placeholder}
            value={value} 
            onChange={handleInputChange}
          />
          <span className={styles.charCounter}>
            <p>
              {charCount} / {maxLength}
            </p>
          </span>
        </div>
      ) : (
        <>
          <input
            type={type}
            name={name}
            className={styles.inputField}
            placeholder={placeholder}
            value={value} 
            onChange={handleInputChange}
          />
          {spanText && <span className={styles.note}>{spanText}</span>}
        </>
      )}
    </div>
  );
};

export default InputGroup;
