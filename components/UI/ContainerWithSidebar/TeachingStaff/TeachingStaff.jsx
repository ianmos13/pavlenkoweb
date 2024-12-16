import { useEffect, useState, useRef } from "react";
import Pagination from "@/components/UI/Pagination/Pagination";
import MentorCardItem from "../../MentorCardItem/MentorCardItem";
import styles from "./TeachingStaff.module.scss";

const TeachingStaff = ({ staf = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const contentRef = useRef(null); 

  useEffect(() => {
    setCurrentPage(1);
  }, [staf]);

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTop(); 
  };

  if (!staf || staf.length === 0) {
    return <div>No staf to display</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = staf.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.staffаContainer} ref={contentRef} >
      <div className={styles.grid}>
        {currentItems.map((staf) => (
          <MentorCardItem
            key={staf.id}
            name={staf.name}
            specialty={staf.position}
            biography={staf.biography}
            avatar={staf.avatar}
            photo={staf.photo}
            location={staf.location}
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

export default TeachingStaff;
