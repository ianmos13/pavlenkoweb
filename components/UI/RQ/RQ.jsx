"use client";

import TelegramIcon from '@/public/images/icons/telegram-grey.svg'
import VkIcon from '@/public/images/icons/vk-dark.svg'
import DzenIcon from '@/public/images/icons/dzen-dark.svg'
import Image from 'next/image'
import styles from './RQ.module.scss'
import Link from "next/link";

export default function RQ() {
	return (
		<div className={styles.blocksContainer}>
			<div className={styles.topContainer}>
				<div className={styles.block}>
					<h3>Партнерам</h3>
					<div className={styles.textContainer}>
						<a className={styles.linkText} href="mailto:partners@shkolapavlenko.ru">partners@shkolapavlenko.ru</a>
					</div>
				</div>
				<div className={styles.block}>
					<h3>Резидентам</h3>
					<div className={styles.textContainer}>
						<a className={styles.linkText} href="mailto:admission@shkolapavlenko.ru">admission@shkolapavlenko.ru</a>
					</div>
				</div>
				<div className={styles.block}>
					<h3>СМИ</h3>
					<div className={styles.textContainer}>
						<a className={styles.linkText} href="mailto:pr@shkolapavlenko.ru">pr@shkolapavlenko.ru</a>
					</div>
				</div>
				<div className={styles.block}>
					<h3>Наши соц сети</h3>
					<div className={`${styles.textContainer} ${styles.mediaContainer}`}>
						<div className={styles.iconContainer}>
							<Link className={styles.link} href={"https://t.me/ShkolaPavlenko"}>
								<Image className={styles.image} src={TelegramIcon} alt="" />
							</Link>
						</div>
						<div className={styles.iconContainer}>
							<Link className={styles.link} href={"https://vk.com/shkolapavlenko"}>
								<Image className={styles.image} src={VkIcon} alt="" />
							</Link>
						</div>
						<div className={styles.iconContainer}>
							<Link className={styles.link} href={"https://dzen.ru/id/622ede4f0e26331f27519b96"}>
								<Image className={styles.image} src={DzenIcon} alt="" />
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.bottomContainer}>
				<h3>
					Остались вопросы? По любым вопросам и предложениям можно написать на
					почту.
				</h3>
				<a className={styles.linkText} href="mailto:info@shkolapavlenko.ru">info@shkolapavlenko.ru</a>
			</div>
		</div>
	)
}
