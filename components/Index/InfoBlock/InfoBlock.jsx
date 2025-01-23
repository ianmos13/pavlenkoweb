import BlocksContainer from '@/components/UI/BlocksContainer/BlocksContainer'
import styles from './InfoBlock.module.scss'

export default function InfoBlock() {
	return (
		<section className={`${styles.block} container`}>
			<div className={styles.container}>
				<div className={styles.textContainer}>
					<h3 className={styles.text}>
						<span className={styles.focusText}>Школа Павленко</span>– некоммерческий
						образовательный проект по&nbsp;подготовке специализированных
						хирургов-онкологов для&nbsp;выпускников ординатур. Наши резиденты и&nbsp;выпускники
						уже&nbsp;помогают тысячам пациентов с&nbsp;диагнозом рак в&nbsp;разных
						городах страны.
					</h3>
					<h3 className={styles.text}>
						Резиденты поступают в&nbsp;школу на&nbsp;конкурсной основе, обучение для&nbsp;них
						бесплатно. Проект является некоммерческим и&nbsp;работает благодаря
						поддержке доноров, разделяющих нашу миссию.
					</h3>
					<h3 className={styles.text}>
						Школа создана в&nbsp;2019&nbsp;году петербургским врачом
						<a className={styles.link} href='/biography'>
							Андреем Павленко
						</a>
						, а&nbsp;также его&nbsp;друзьями и&nbsp;коллегами.
					</h3>
				</div>
				<BlocksContainer info={info} />
			</div>
		</section>
	)
}

const info = [
	{
		header: '2000 онкологов',
		text: "такого количества практикующих специалистов не\u00A0хватает в\u00A0России по\u00A0оценкам Минздрава РФ",
	},
	{
		header: '500 пациентов',
		text: 'такая нагрузка приходится в\u00A0среднем на\u00A0одного врача-онколога сегодня',
	},
	{
		header: '80% пациентов',
		text: 'с\u00A0диагнозом рак, нуждаются в\u00A0хирургическом вмешательстве',
	},
	{
		header: 'менее 30%',
		text: 'онкологических пациентов получают доступ к\u00A0cвоевременной, безопасной и\u00A0доступной хирургической помощи по\u00A0экспертным оценкам',
	},
]
