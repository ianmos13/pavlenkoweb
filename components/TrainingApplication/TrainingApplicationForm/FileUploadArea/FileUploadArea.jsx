"use client";
import React, { useState, useRef } from "react";
import styles from "./FileUploadArea.module.scss";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const FileUploadArea = ({ label, fileId, onChange, resetKey }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const validateFiles = (selectedFiles) => {
    const validFiles = [];
    let errorMessage = "";

    selectedFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        errorMessage = `Файл "${file.name}" превышает 10 МБ и не был добавлен.`;
      } else {
        validFiles.push(file);
      }
    });

    setError(errorMessage);
    return validFiles;
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = validateFiles(selectedFiles);
    setFiles(validFiles.map((file) => file.name));

    if (onChange) onChange(validFiles);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const clearFiles = () => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setError("");
  };

  React.useEffect(() => {
    clearFiles();
  }, [resetKey]);


  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(event.dataTransfer.files);
    const validFiles = validateFiles(droppedFiles);
    setFiles(validFiles.map((file) => file.name));

    if (onChange) onChange(validFiles);
  };

  return (
    <div>
      <div className={styles.subLabel}>
        <h5>{label}</h5>
      </div>
      <div
        className={`${styles.fileUploadArea} ${isDragging ? styles.dragging : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <span className={styles.uploadInstruction}>
          Перетащите файлы в формате{" "}
          <span className={styles.ext}>pdf, jpeg, tif, zip, rar</span>
          <br />
          или выберите на компьютере
        </span>
        <input
          ref={fileInputRef}
          type="file"
          id={`fileInput_${fileId}`}
          accept=".pdf,.jpeg,.jpg,.tif,.zip,.rar"
          className={styles.fileInput}
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <a className={styles.fileLink} onClick={handleClick}>
          <img src="/images/icons/substract.svg" alt="Select file icon" />
          <p>{files.length ? files.join(", ") : "Выбрать\u00A0файлы"}</p>
        </a>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FileUploadArea;
