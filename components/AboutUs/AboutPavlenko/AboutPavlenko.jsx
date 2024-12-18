import ImageBlock from '@/components/UI/ImageBlock/ImageBlock'
import BottomLeft from '@/public/images/bottom-left-about-us.svg'
import BottomRight from '@/public/images/bottom-right-about-us.svg'
import TopLeft from '@/public/images/top-left-about-us.png'
import TopRight from '@/public/images/top-right-about-us.svg'
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
								Один из лучших хирургов-онкологов России, руководитель
								онкологического центра «Клиники высоких медицинских технологий
								имени Н. И. Пирогова при Санкт-Петербургском государственном
								университете».
							</h4>
							<h4>
								В 2019 году Андрей заболел раком желудка и прошёл путь пациента,
								поддерживая тысячи людей своим отношением к болезни и
								просветительской работой. Одной из главных его целей стало
								создание Школы практической онкологии, которая смогла бы в
								долгосрочной перспективе увеличить выживаемость российских
								пациентов.
							</h4>
							<h4>
								В январе 2020 года Андрей ушел из жизни, но его проекты
								продолжают развитие. Для команды Школы очень важно сохранить и
								продолжить дело друга, наставника и учителя.
							</h4>
						</div>
					</div>
				</div>
				<div className={styles.imageContainer}>
					<ImageBlock
						TopLeft={TopLeft}
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
