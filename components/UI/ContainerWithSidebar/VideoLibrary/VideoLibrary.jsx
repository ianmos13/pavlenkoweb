import Pagination from '@/components/UI/Pagination/Pagination'
import { useEffect, useState, useRef } from "react";
import VideoItem from '../../VideoItem/VideoItem'
import styles from './VideoLibrary.module.scss'

const VideoLibrary = ({ video = [] }) => {
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 6
	const contentRef = useRef(null); 

	useEffect(() => {
		setCurrentPage(1)
	}, [video])

	if (!video || video.length === 0) {
		return <div>No video to display</div>
	}

	const startIndex = (currentPage - 1) * itemsPerPage
	const currentItems = video.slice(startIndex, startIndex + itemsPerPage)

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
		<div className={styles.videoContainer} ref={contentRef}>
			<div className={styles.grid}>
				{currentItems.map(video => (
					<VideoItem
						key={video.id}
						title={video.title}
						authors={video.authors}
						category={video.category}
						link={video.link}
					/>
				))}
			</div>

			<Pagination
				totalPages={Math.ceil(video.length / itemsPerPage)}
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
		</div>
	)
}

export default VideoLibrary
