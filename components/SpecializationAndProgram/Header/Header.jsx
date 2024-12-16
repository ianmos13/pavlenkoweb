import RunningLine from '@/components/UI/RunningLines/RunningLine/RunningLine'
import styles from './Header.module.scss'

const Header = () => {
	const data = [
		'Онкоурология',
		'Upper GI (верхние отделы пищеварительного тракта)',
		'Голова и шея',
		'Хирургия',
	]

	return (
		<div className={styles.headerContainer}>
			<div className={styles.headerContainerInner}>
				<div className={styles.textSection}>
					<h1>
						В школе проходят наборы на
						<span className={styles.focusText}> 6 специализаций</span>
					</h1>
				</div>
				<div className={styles.imageSection}>
					<img
						src='/images/aboutUS-header.svg'
						alt='Заголовок для aboutUS'
						className={styles.image}
					/>
				</div>
			</div>
			<div className={styles.runningLine}>
				<div className={styles.lines}>
					<RunningLine data={data} />
				</div>
			</div>
		</div>
	)
}

export default Header
