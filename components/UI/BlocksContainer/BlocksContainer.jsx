import styles from './BlocksContainer.module.scss'

export default function BlocksContainer({ info }) {
	return (
		<div className={styles.blocksContainer}>
			{info?.map((infoItem, index) => (
				<div className={styles.block} key={index}>
					<h3 className={`secondary`}>{infoItem.header}</h3>
					<p className={styles.text}>{infoItem.text}</p>
				</div>
			))}
		</div>
	)
}
