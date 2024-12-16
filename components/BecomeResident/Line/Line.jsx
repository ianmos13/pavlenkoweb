import RunningLine from '@/components/UI/RunningLines/RunningLine/RunningLine'
import styles from './Line.module.scss'

export default function Line({ data }) {
	return (
		<div className={styles.lineContainer}>
			<RunningLine data={data} />
		</div>
	)
}
