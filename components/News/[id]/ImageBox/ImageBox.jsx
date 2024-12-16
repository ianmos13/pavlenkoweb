import ImageBlock from '@/components/UI/ImageBlock/ImageBlock'
import styles from './ImageBox.module.scss'
export default function ImageBox({
	TopLeft,
	TopRight,
	BottomLeft,
	BottomRight,
}) {
	return (
		<section className={`${styles.container} container`}>
			<div className={styles.textContainer}>
				<h3>
					Тема осложнений в хирургии малого таза тесно связана с коморбидным
					фоном, особенно у пациентов с сопутствующей или конкурирующей
					кардиологической патологией. Этому в программе был отведён отдельный
					доклад, посвященный кардиоонкологии.
				</h3>
				<h3>
					Мероприятие прошло в гибридном формате. Запись доступна на
					youtube-каналах ГКОБ №1 и 4SurgeonsClub, проекта под эгидой Школы
					Павленко.
				</h3>
			</div>
			<div className={styles.imageContainer}>
				<ImageBlock
					TopLeft={TopLeft}
					TopRight={TopRight}
					BottomLeft={BottomLeft}
					BottomRight={BottomRight}
				/>
			</div>
		</section>
	)
}
