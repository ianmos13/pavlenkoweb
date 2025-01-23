"use client";

import ButtonBox from '@/components/UI/Buttons/ButtonBox/ButtonBox'
import LearnMoreButton from '@/components/UI/Buttons/LearnMoreButton/LearnMoreButton'
import ImageBlock from '@/components/UI/ImageBlock/ImageBlock'
import BottomLeft from '@/public/images/image_box/bottom-left-filter.webp'
import BottomRight from '@/public/images/image_box/bottom-right-filter.webp'
import TopLeft from '@/public/images/image_box/top-left-filter.webp'
import TopRight from '@/public/images/image_box/top-right-filter.webp'
import styles from './ImageBox.module.scss'
import {useRouter} from "next/navigation";

export default function ImageBox() {
	const router = useRouter();
	const goToPage = () => {
		router.push("/specialization-and-program");
	};

	return (
		<section className={`${styles.block} container`}>
			<div className={styles.header}>
				<h2>Авторская образовательная программа</h2>
			</div>
			<div className={styles.container}>
				<div className={styles.textContainer}>
					<div className={styles.textBlock}>
						<div className={styles.header}>
							<h2>Авторская образовательная программа</h2>
						</div>
						<div className={styles.text}>
							<h4>
								Разработана для&nbsp;выпускников ординатуры – онкологов, хирургов и&nbsp;торакальных хирургов.
								Рассчитана на&nbsp;два года обучения под&nbsp;руководством наставников.
							</h4>
							<h4>
								На&nbsp;время программы резиденты трудоустраиваются на&nbsp;часть ставки в&nbsp;больницы, а&nbsp;также получают стипендию.
							</h4>
							<h4>
								В&nbsp;программу входит 70% практики в&nbsp;операционных и&nbsp;30% насыщенных
								теоретических знаний по: клинической онкологии, интенсивной
								терапии, лучевой диагностике, основам анестезиологии и&nbsp;реанимации,
								периоперационному ведению, основам морфологии, а&nbsp;также занятия
								по&nbsp;коммуникации с&nbsp;пациентами по&nbsp;Калгари-Кембриджской
								модели и&nbsp;журнальный клуб с&nbsp;разбором современных научных статей.
							</h4>
						</div>
					</div>
					<ButtonBox>
						<LearnMoreButton text={'Узнать больше'} onClick={goToPage} />
					</ButtonBox>
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
