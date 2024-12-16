import Pagination from '@/components/UI/Pagination/Pagination'
import { useEffect, useState, useRef } from 'react'
import CardItem from '../../CardItem/CardItem'
import styles from './PublicationLibrary.module.scss'

const PublicationLibrary = ({ publications = [] }) => {
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 6
	const contentRef = useRef(null); 
	useEffect(() => {
		setCurrentPage(1)
	}, [publications])

	const scrollToTop = () => {
		if (contentRef.current) {
		  contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	  };

	if (!publications || publications.length === 0) {
		return <div>No publications to display</div>
	}

	const startIndex = (currentPage - 1) * itemsPerPage
	const currentItems = publications.slice(startIndex, startIndex + itemsPerPage)

	const handlePageChange = page => {
		setCurrentPage(page)
		scrollToTop(); 
	}

	return (
		<div className={styles.publicationLibraryContainer} ref={contentRef}>
			<div className={styles.grid}>
				{currentItems.map(publication => (
					<CardItem
						key={publication.link}
						header={publication.header}
						body={publication.body}
						category={publication.category}
						link={publication.link}
					/>
				))}
			</div>

			<Pagination
				totalPages={Math.ceil(publications.length / itemsPerPage)}
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
		</div>
	)
}

export default PublicationLibrary
