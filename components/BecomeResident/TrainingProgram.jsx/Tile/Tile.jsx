import styles from './Tile.module.scss'

export default function Tile({ header, text, label }) {
	return (
		<div className={`${styles.container} container`}>
			<h3>{header}</h3>
			<div className={styles.description}>
				<p className={styles.text}>{text}</p>
				<p className={styles.label}>{label}</p>
			</div>
		</div>
	)
}
