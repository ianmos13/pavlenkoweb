import Pagination from "@/components/UI/Pagination/Pagination";
import { useEffect, useState, useRef } from "react";
import styles from "./DocumentsLibrary.module.scss";
import Link from "next/link";

const DocumentsLibrary = ({ documents = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const contentRef = useRef(null); 
  useEffect(() => {
    setCurrentPage(1);
  }, [documents]);

  if (!documents || documents.length === 0) {
    return <div>No documents to display</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = documents.slice(startIndex, startIndex + itemsPerPage);

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTop(); 
  };

  return (
    <div className={styles.documentsContainer} ref={contentRef}>
      <div className={styles.grid}>
        {currentItems.map((document) => (
          <Link
              href={document.file ? document.file : document.url}
              target="_blank"
              rel="noopener noreferrer"
          >
            <div key={document.id} className={styles.documentItem}>
              <h3>{document.name}</h3>
              <img
                alt=""
                className={styles.icon}
                src="/images/icons/right-red-icon.svg"
              />
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        totalPages={Math.ceil(documents.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DocumentsLibrary;
