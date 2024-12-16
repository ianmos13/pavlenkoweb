import styles from "./Pagination.module.scss";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 4; // Всегда отображать ровно три компонента между ...
    let startPage, endPage;

    // Логика определения диапазона видимых страниц
    if (currentPage <= 2) {
      startPage = 1;
      endPage = Math.min(maxVisiblePages, totalPages);
    } else if (currentPage >= totalPages - 1) {
      startPage = Math.max(totalPages - (maxVisiblePages - 1), 1);
      endPage = totalPages;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    // Добавление начального многоточия
    if (startPage > 2) {
      pageNumbers.push(
        <button
          key={1}
          className={currentPage === 1 ? styles.activePage : ""}
          onClick={() => onPageChange(1)}>
          <p>1</p>
        </button>
      );
      pageNumbers.push(
        <span key="start-ellipsis" className={styles.ellipsis}>
          ...
        </span>
      );
    } else if (startPage === 2) {
      pageNumbers.push(
        <button
          key={1}
          className={currentPage === 1 ? styles.activePage : ""}
          onClick={() => onPageChange(1)}>
          <p>1</p>
        </button>
      );
    }

    // Генерация номеров страниц
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={i === currentPage ? styles.activePage : ""}
          onClick={() => onPageChange(i)}>
          <p>{i}</p>
        </button>
      );
    }

    // Добавление конечного многоточия
    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <span key="end-ellipsis" className={styles.ellipsis}>
          ...
        </span>
      );
      pageNumbers.push(
        <button
          key={totalPages}
          className={currentPage === totalPages ? styles.activePage : ""}
          onClick={() => onPageChange(totalPages)}>
          <p>{totalPages}</p>
        </button>
      );
    } else if (endPage === totalPages - 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          className={currentPage === totalPages ? styles.activePage : ""}
          onClick={() => onPageChange(totalPages)}>
          <p>{totalPages}</p>
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrowButton}
        onClick={handlePrevious}
        disabled={currentPage === 1}>
        <img
          src={"/images/icons/left-arrow-pagination.svg"}
          alt="Left Arrow Icon"
        />
      </button>

      {renderPageNumbers()}

      <button
        className={styles.arrowButton}
        onClick={handleNext}
        disabled={currentPage === totalPages}>
        <img
          src={"/images/icons/right-arrow-pagination.svg"}
          alt="Right Arrow Icon"
        />
      </button>
    </div>
  );
};

export default Pagination;
