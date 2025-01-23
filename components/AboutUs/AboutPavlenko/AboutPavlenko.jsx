import ImageBlock from '@/components/UI/ImageBlock/ImageBlock'
import BottomLeft from '@/public/images/bottom-left-about-us.webp'
import BottomRight from '@/public/images/bottom-right-about-us.webp'
import TopLeft from '@/public/images/top-left-about-us.webp'
import TopRight from '@/public/images/top-right-about-us.webp'
import styles from './AboutPavlenko.module.scss'

const AboutPavlenko = () => {
	return (
		<section className={`${styles.block} container`}>
			<div className={styles.container}>
				<div className={styles.textContainer}>
					<div className={styles.textBlock}>
						<div className={styles.header}>
							<h2>Андрей Павленко</h2>
						</div>
						<div className={styles.text}>
							<h4>
								Один из&nbsp;лучших хирургов-онкологов России, руководитель
								онкологического центра «Клиники высоких медицинских технологий
								имени Н.&nbsp;И.&nbsp;Пирогова при&nbsp;Санкт-Петербургском государственном
								университете».
							</h4>
							<h4>
								В&nbsp;2018 году Андрей заболел раком желудка и&nbsp;прошёл путь пациента,
								поддерживая тысячи людей своим отношением к&nbsp;болезни и&nbsp;просветительской
								работой. Одной из&nbsp;главных его целей стало
								создание Школы практической онкологии, которая смогла&nbsp;бы
								в&nbsp;долгосрочной перспективе увеличить выживаемость российских
								пациентов.
							</h4>
							<h4>
								В&nbsp;январе 2020 года Андрей ушел из&nbsp;жизни, но&nbsp;его проекты
								продолжают развитие. Для&nbsp;команды Школы очень важно сохранить и
								продолжить дело друга, наставника и&nbsp;учителя.
							</h4>
						</div>
					</div>
				</div>
				<div className={styles.imageContainer}>
					<ImageBlock
						TopLeft={TopLeft}
						TopLeftDescription={"Фото Ксении Ивановой"}
						TopRight={TopRight}
						BottomLeft={BottomLeft}
						BottomRight={BottomRight}
					/>
				</div>
			</div>
		</section>
	)
}

export default AboutPavlenko
