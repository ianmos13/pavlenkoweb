"use client";

import styles from "./CopyLinkToast.module.scss";

const CopyLinkToast = ({
  isVisible,
  message = "ссылка скопирована",
}) => {
  if (!isVisible) return null;

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      {message}
    </div>
  );
};

export default CopyLinkToast;
