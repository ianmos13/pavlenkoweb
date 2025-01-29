import Pagination from '@/components/UI/Pagination/Pagination';
import { useEffect, useState, useRef } from 'react';
import styles from './NewsLibrary.module.scss';
import NewsCardItem from "@/components/UI/Cards/NewsCardItem/NewsCardItem";

const NewsLibrary = ({ news = [] }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;
	const contentRef = useRef(null); 

	const scrollToTop = () => {
		if (contentRef.current) {
			contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
			setTimeout(() => {
				window.scrollBy(0, -20);
			}, 500);
		}
	  };

	useEffect(() => {
		setCurrentPage(1);
	}, [news]);

	if (news.length === 0) {
		return <div>No news to display!</div>;
	}

	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentItems = news.slice(startIndex, startIndex + itemsPerPage);

	const handlePageChange = (page) => {
		setCurrentPage(page);
		setTimeout(() => {
			scrollToTop();
		}, 100)
	};

	return (
		<div className={styles.newsContainer} ref={contentRef}>
			
			<div className={styles.grid}>
				{currentItems.map((item) => (
					<NewsCardItem
						key={item.id}
						header={item.header}
						title={item.title}
						body={item.body}
						category={item.category}
						date={item.date}
						link={item.link}
					/>
				))}
			</div>

			<Pagination
				totalPages={Math.ceil(news.length / itemsPerPage)}
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
		</div>
	);
};

export default NewsLibrary;
