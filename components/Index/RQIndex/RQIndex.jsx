import RQ from '@/components/UI/RQ/RQ'
import styles from './RQIndex.module.scss'

export default function RQIndex() {
	return (
		<section className={`${styles.container} container`}>
			<div className={styles.headerContainer}>
				<h2>Остались вопросы?</h2>
			</div>
			<RQ />
		</section>
	)
}
