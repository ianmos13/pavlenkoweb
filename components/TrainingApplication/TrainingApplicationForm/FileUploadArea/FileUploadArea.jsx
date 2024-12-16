"use client";
import styles from "./FileUploadArea.module.scss";
import React, { useState } from "react";

const FileUploadArea = ({ label, fileId, onChange }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      if (onChange) onChange(file);
    }
  };

  const handleClick = () => {
    document.getElementById(`fileInput_${fileId}`).click();
  };

  return (
    <div>
      <div className={styles.subLabel}>
        <h5>{label}</h5>
      </div>
      <div className={styles.fileUploadArea}>
        <span className={styles.uploadInstruction}>
          Перетащите файлы в формате{" "}
          <span className={styles.ext}>pdf, jpeg, tif, zip, rar</span>
          <br />
          или выберите на компьютере
        </span>
        <input
          type="file"
          id={`fileInput_${fileId}`}
          accept=".pdf,.jpeg,.jpg,.tif,.zip,.rar"
          className={styles.fileInput}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <a className={styles.fileLink} onClick={handleClick}>
          <img src="/images/icons/substract.svg" alt="Select file icon" />
          <p>{fileName || "Выбрать файл"}</p>
        </a>
      </div>
    </div>
  );
};

export default FileUploadArea;
