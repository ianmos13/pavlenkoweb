import styles from './List.module.scss'
import Ul from './Ul/Ul'

export default function List({ headerText, arrayList }) {
	return (
		<div className={`${styles.container} container`}>
			<div className={styles.headerContainer}>
				<h3 className={styles.headerText}>{headerText}</h3>
			</div>
			<div className={styles.listContainer}>
				{arrayList.length > 0 && <Ul arrayList={arrayList} />}
			</div>
		</div>
	)
}
