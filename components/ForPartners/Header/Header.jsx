"use client";

import ApplyButton from '@/components/UI/Buttons/ApplyButton/ApplyButton'
import Photo from '@/public/images/partners.webp'
import Image from 'next/image'
import styles from './Header.module.scss'
export default function Header() {
	const buttonUrl = "https://www.youtube.com/";

	const onSubmit = () => {
		window.open(buttonUrl, "_blank");
	};
	return (
		<section className={`${styles.container}`}>
			<div className={styles.mainBox}>
				<div className={styles.descriptionContainer}>
					<div className={styles.textContainer}>
						<h1>Корпоративным партнерам</h1>
						<div className={styles.text}>
							<h4>
								Школа Павленко является некоммерческим проектом и работает
								благодаря поддержке доноров и спонсоров, разделяющих нашу миссию.
							</h4>
							<h4>
								Школа помогает восполнить нехватку хирургов онкологов и помочь
								людям, страдающим от рака в нашей стране.
							</h4>
							<h4>
								Мы рады предложить форматы благотворительной помощи, отвечающие
								ценностям и стратегии вашей компании
							</h4>
						</div>
					</div>
					<div className={styles.buttonContainer}>
						<ApplyButton text={'Презентация для партнеров'} onClick={onSubmit} />
					</div>
				</div>
				<div className={styles.imageContainer}>
					<Image src={Photo} className={styles.image} alt=""/>
				</div>
			</div>
		</section>
	)
}
