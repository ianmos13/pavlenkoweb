import styles from './InterestingForSurgeons.module.scss'

const InterestingForSurgeons = ({ theme, data, top, bottom }) => {
	return (
		<div
			className={`
				${styles.container}
		 		${top ? styles.top : ''}
		 		${bottom ? styles.bottom: ''}
		 		container`}
		>
			<div
				className={`${styles.containerInner} ${styles[theme]}`}
			>
				<h2>Интересное для онкохирургов</h2>
				<div className={styles.cards}>
					{data?.map((item, index) => (
						<div className={styles.card} key={index}>
							<div className={styles.cardHeader}>
								<h3>{item.header}</h3>
								<p>{item.text}</p>
							</div>
							<a href={item.linkHref}>{item.linkText} &rarr;</a>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default InterestingForSurgeons
