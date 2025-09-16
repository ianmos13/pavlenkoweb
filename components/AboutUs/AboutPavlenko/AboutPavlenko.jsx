import ImageBlock from '@/components/UI/ImageBlock/ImageBlock'
import styles from './AboutPavlenko.module.scss'
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

const AboutPavlenko = () => {
	return (
		<AnimatedComponent>
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
						TopLeft={"/images/top-left-about-us.webp"}
						TopLeftDescription={"Фото Ксении Ивановой"}
						TopRight={"/images/top-right-about-us.webp"}
						BottomLeft={"/images/bottom-left-about-us.webp"}
						BottomRight={"/images/bottom-right-about-us.webp"}
					/>
				</div>
			</div>
		</section>
		</AnimatedComponent>
	)
}

export default AboutPavlenko
