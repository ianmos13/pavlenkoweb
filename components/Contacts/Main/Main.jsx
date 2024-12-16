import RQ from '@/components/UI/RQ/RQ'
import styles from './Main.module.scss'
export default function Main() {
	return (
		<>
			<div className={`${styles.container} container`}>
				<RQ />
			</div>
		</>
	)
}
