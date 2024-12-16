import Pagination from "@/components/UI/Pagination/Pagination";
import { useEffect, useState, useRef } from "react";
import PersonItem from "@/components/UI/PersonItem/PersonItem";
import styles from "./SchoolTeamLibrary.module.scss";

const SchoolTeamLibrary = ({ staf = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const contentRef = useRef(null); 
  useEffect(() => {
    setCurrentPage(1);
  }, [staf]);

  if (!staf || staf.length === 0) {
    return <div>No staf to display</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = staf.slice(startIndex, startIndex + itemsPerPage);

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
    <div className={styles.staffContainer} ref={contentRef}>
      <div className={styles.grid}>
        {currentItems.map((staf) => (
          <PersonItem
            key={staf.id}
            name={staf.name}
            position={staf.position}
            biography={staf.biography}
            avatar={staf.avatar}
            photo={staf.photo}
          />
        ))}
      </div>

      <Pagination
        totalPages={Math.ceil(staf.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SchoolTeamLibrary;
