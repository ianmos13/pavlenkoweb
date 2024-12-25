import BlocksContainer from '@/components/UI/BlocksContainer/BlocksContainer'
import styles from './InfoBlock.module.scss'

export default function InfoBlock() {
	return (
		<section className={`${styles.block} container`}>
			<div className={styles.container}>
				<div className={styles.textContainer}>
					<h3 className={styles.text}>
						<span className={styles.focusText}>Школа Павленко</span>– это
						проект в России по&nbsp;подготовке специализированных
						хирургов-онкологов для выпускников ординатур. Наши резиденты и
						выпускники уже помогают тысячам пациентов с диагнозом рак в разных
						городах страны.
					</h3>
					<h3 className={styles.text}>
						Резиденты поступают в школу на конкурсной основе, обучение для них
						бесплатно. Проект является некоммерческим и работает благодаря
						поддержке доноров, разделяющих нашу миссию.
					</h3>
					<h3 className={styles.text}>
						Школа создана в 2019 году петербургским врачом
						<a className={styles.link} href='/biography'>
							Андреем Павленко
						</a>
						, а также его друзьями и коллегами.
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
		text: 'такого количества практикующих специалистов не хватает в России по оценкам Минздрава РФ',
	},
	{
		header: '500 пациентов',
		text: 'такая нагрузка приходится в среднем на одного врача-онколога сегодня',
	},
	{
		header: '80% пациентов',
		text: 'с диагнозом рак, нуждаются в срочном хирургическом вмешательстве',
	},
	{
		header: 'не более 30%',
		text: 'онкологических пациентов получают доступ к cвоевременной, безопасной и доступной хирургической помощи',
	},
]
