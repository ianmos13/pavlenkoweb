"use client";

import ButtonBox from '@/components/UI/Buttons/ButtonBox/ButtonBox'
import LearnMoreButton from '@/components/UI/Buttons/LearnMoreButton/LearnMoreButton'
import ImageBlock from '@/components/UI/ImageBlock/ImageBlock'
import BottomLeft from '@/public/images/image_box/bottom-left-filter.svg'
import BottomRight from '@/public/images/image_box/bottom-right-filter.svg'
import TopLeft from '@/public/images/image_box/top-left-filter.svg'
import TopRight from '@/public/images/image_box/top-right-filter.svg'
import styles from './ImageBox.module.scss'
import {useRouter} from "next/navigation";

export default function ImageBox() {
	const router = useRouter();
	const goToPage = () => {
		router.push("/specialization-and-program");
	};

	return (
		<section className={`${styles.block} container`}>
			<div className={styles.container}>
				<div className={styles.textContainer}>
					<div className={styles.textBlock}>
						<div className={styles.header}>
							<h2>Авторская образовательная программа</h2>
						</div>
						<div className={styles.text}>
							<h4>
								Разработана для выпускников ординатуры – онкологов, хирургов и
								торакальных хирургов. Рассчитана на два года обучения под
								руководством наставников.
							</h4>
							<h4>
								На время программы резиденты трудоустраиваются на часть ставки в
								больницы, а также получают стипендию.
							</h4>
							<h4>
								В программу входит 70% практики в операционных и 30% насыщенных
								теоретических знаний по: клинической онкологии, интенсивной
								терапии, лучевой диагностике, основам анестезиологии и
								реанимации, периоперационному ведению, основам морфологии, а
								также занятия по коммуникации с пациентами по
								Калгари-Кембриджской модели и журнальный клуб с разбором
								современных научных статей.
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
