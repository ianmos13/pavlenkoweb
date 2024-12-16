import Telegram from '@/public/images/icons/telegram-grey.svg'
import Image from 'next/image'
import styles from './RQ.module.scss'

export default function RQ() {
	return (
		<div className={styles.blocksContainer}>
			<div className={styles.topContainer}>
				<div className={styles.block}>
					<h3>Партнерам</h3>
					<div className={styles.textContainer}>
						<p>Мариам Маргарян</p>
						<p className={styles.linkText}>partners@shkolapavlenko.ru</p>
					</div>
				</div>
				<div className={styles.block}>
					<h3>Резидентам</h3>
					<div className={styles.textContainer}>
						<p>Наталья Лосева</p>
						<p className={styles.linkText}>admission@shkolapavlenko.ru</p>
					</div>
				</div>
				<div className={styles.block}>
					<h3>СМИ</h3>
					<div className={styles.textContainer}>
						<p>Мария Бырдина</p>
						<p className={styles.linkText}>pr@shkolapavlenko.ru</p>
					</div>
				</div>
				<div className={styles.block}>
					<h3>Наши соц сети</h3>
					<div className={styles.textContainer}>
						<div className={styles.iconContainer}>
							<Image className={styles.image} src={Telegram} alt="" />
						</div>
					</div>
				</div>
			</div>
			<div className={styles.bottomContainer}>
				<h3>
					Остались вопросы? По любым вопросам и предложениям можно написать на
					почту.
				</h3>
				<h3 className={styles.linkText}>info@shkolapavlenko.ru</h3>
			</div>
		</div>
	)
}
