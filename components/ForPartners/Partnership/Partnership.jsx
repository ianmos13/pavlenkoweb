import styles from './Partnership.module.scss'

export default function Partnership() {
	return (
		<section className={`${styles.block} container`}>
			<div className={styles.container}>
				<div className={styles.topContainer}>
					<h2>Возможности для сотрудничества</h2>
				</div>
				<div className={styles.bottomContainer}>
					<div className={styles.tile}>
						<h3 style={{ color: '#ED3834' }}>Единственная в России</h3>
						<p>
							Программа по подготовке специализированных хирургов-онкологов для
							выпускников ординатур (аналог fellowship)
						</p>
					</div>
					<div className={styles.tile}>
						<h3 style={{ color: '#ED3834' }}>
							Школа делает системные изменения
						</h3>
						<p>
							Каждый выпускник школы за свою карьеру сделает не менее 2 000
							больших операций по современным стандартам, а с учетом
							консультаций и малых операций поможет не менее чем 10 000
							пациентов
						</p>
					</div>
					<div className={styles.tile}>
						<h3 style={{ color: '#ED3834' }}>Эффективные инвестиции</h3>
						<p>
							Результат которых будет работать десятилетия и улучшит качество
							жизни людей в масштабах страны
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
